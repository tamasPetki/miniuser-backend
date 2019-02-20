const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashedPw => {
        const user = new User({name: name, email: email, password: hashedPw});
        return user.save();
    })
        .then(res => res.status(201).json({message: 'User created!'}))
        .catch(error => {if (!error.statusCode) { error.statusCode = 500;} next(error)});
};


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({where: {email: email}}).then(user => {
        if(!user) {
            // couldn't find user
            const error = new Error('Wrong username or password');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
        .then(isEqual => {
            if (!isEqual) {
                // password does not match
                const error = new Error('Wrong username or password');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({email: loadedUser.email, id: loadedUser.id },
                'kulcssoft-secret-key', {expiresIn: '1h'});
            res.status(200).json({token:token, userId: loadedUser.id})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
