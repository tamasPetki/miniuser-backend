const express = require('express');
const feedController = require('../controllers/feed');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get('/all-users', isAuth, feedController.getAllUsers);

router.delete('/delete-user/:id', isAuth, feedController.deleteUser);

module.exports = router;
