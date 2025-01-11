// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const attendanceController = require('../controllers/attendanceController');


router.post('/api/login', authController.login);
router.get('/api/users/:id', userController.getUserById);
router.get('/api/attendance/:id', attendanceController.getAttendanceById);

module.exports = router;