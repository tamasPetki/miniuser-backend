const User = require('../models/user');

module.exports.getAllUsers = (req, res, next) => User.findAll().then(items => res.status(201).json(items));

module.exports.deleteUser = (req, res, next) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(user => user.destroy())
        .then(response => res.status(201).json({message: 'User deleted'}))
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500
            }
            next(error)
        });
};
