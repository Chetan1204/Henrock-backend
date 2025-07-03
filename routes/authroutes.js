const express = require('express');
const router = express.Router();
const { login, refreshToken, logout, register, changePassword, getProfile, updateProfile} = require('../controllers/authcontroller'); 
const { protect } = require('../middleware/auth');


router.post('/login', login);
router.post('/register', register);  
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.post('/change-password', protect, changePassword);
router.get('/profile', protect, getProfile);           
router.put('/update-user', protect, updateProfile); 

module.exports = router;
