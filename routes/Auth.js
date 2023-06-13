const express = require('express');
const router = express.Router();
//const authenticateToken = require('../middleware/authenticateToken');
const AuthController = require('../controllers/authController.js');

router.post('/register', AuthController.userRegistration);
router.post('/login', AuthController.userLogin);
router.get('/getusers' , AuthController.getUserList);
router.delete('/:userId', AuthController.deleteUser);

// Protected routes
// router.post('/admin', authenticateToken, AuthController.adminRoute);
// router.post('/delivery', authenticateToken, AuthController.deliveryPartnerRoute);

module.exports = router;

