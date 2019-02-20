const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/all-users', feedController.getAllUsers);

router.delete('/delete-user', feedController.deleteUser);

module.exports = router;
