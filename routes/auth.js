const User = require('../models/user');

const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

// TODO authcontoller.signup
router.put('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .normalizeEmail()
            .custom((value, { req }) => {
                return User.findOne({where: {email: value}}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-mail address already exists!');
                    }
                })
            })
        ,
        check('password')
            .trim()
            .isLength({min: 8}).withMessage('Password must be at least 8 characters'),
        check('name')
            .trim()
            .not().isEmpty()
    ],
    () => {});

// TODO authcontroller.login
router.post('/login', () => {});

module.exports = router;
