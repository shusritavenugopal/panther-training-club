const express = require('express');
const router = express.Router();
const bookTrainerController = require('../controller/bookTrainerController');
const authenticateToken = require('../auth/authenticateToken');

// Route to create a new account for trainer
router.post('/', bookTrainerController.bookTrainer);

// Route to get all trainers
router.get('/', bookTrainerController.getAllBookings);


module.exports = router;