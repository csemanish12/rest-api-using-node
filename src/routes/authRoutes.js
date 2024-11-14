const express = require('express');
const authController = require('../controllers/authController');
const { registerSchema } = require('../schemas/authSchema');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;


