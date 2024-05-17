const express = require('express');
const router = express.Router();
const trainerController = require('../controller/trainerController');
const authenticateToken = require('../auth/authenticateToken');

// Route to create a new account for trainer
router.post('/', trainerController.createTrainerAccount);

// Route to get all trainers
router.get('/', trainerController.getAllTrainers);

// Login a customer
router.post('/login', trainerController.login);

// Profile route
router.get('/profile', authenticateToken, trainerController.getProfile);

// Route to get a trainer by id
router.get('/:id', trainerController.getTrainerById);

// Route to update trainer's profile
router.put('/:id/updateTrainerProfile', trainerController.updateTrainerProfile);

module.exports = router;