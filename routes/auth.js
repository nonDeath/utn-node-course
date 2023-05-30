const express = require('express');
const { register, login } = require('../controllers/User');
const { loginValidator, registerValidator } = require('../validators/authValidators');
const router = express.Router();

router.post('/register', registerValidator, register);

router.post('/login', loginValidator, login);

module.exports = router;
