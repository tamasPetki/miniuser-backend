const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');


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
