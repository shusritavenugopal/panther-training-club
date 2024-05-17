const express = require('express');
const router = express.Router();
const memberController = require('../controller/memberController');
const authenticateToken = require('../auth/authenticateToken');

// Route to create a new account for member
router.post('/', memberController.createMemberAccount);

// Route to get all members
router.get('/', memberController.getAllMembers);

// Login a customer
router.post('/login', memberController.login);

// Profile route
router.get('/profile', authenticateToken, memberController.getProfile);

// Route to get a member by id
router.get('/:id', memberController.getMemberById);

// Route to update member's profile
router.put('/:id/updateMemberProfile', memberController.updateMemberProfile);

module.exports = router;