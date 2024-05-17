const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authenticateToken = require('../auth/authenticateToken');

// Route to create a new account for admin
router.post('/', adminController.createAdminAccount);

// Login a customer
router.post('/login', adminController.login);

// view all trainers and members
router.get('/trainers', adminController.viewAllTrainers);
router.get('/members', adminController.viewAllMembers);
// advanced permissions to delete any trainer and member page
router.delete('/members/:id', adminController.deleteMember);
router.delete('/trainers/:id', adminController.deleteTrainer);

module.exports = router;