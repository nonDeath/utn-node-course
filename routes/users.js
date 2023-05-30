const express = require('express');
const { getUser } = require('../controllers/User');
const { authMiddleware } = require('../support/http/handleJwtSession');
const idValidator = require('../validators/idValidator');
const router = express.Router();

router.get('/:id', authMiddleware, idValidator, getUser);

module.exports = router;
