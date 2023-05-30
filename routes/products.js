const express = require('express');
const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/Product');
const { authMiddleware } = require('../support/http/handleJwtSession');
const {
    searchValidator,
    createValidator,
    updateValidator,
} = require('../validators/productValidators');
const idValidator = require('../validators/idValidator');
const router = express.Router();

router.get('/', searchValidator, getItems);
router.get('/:id', idValidator, getItem);
router.post('/', authMiddleware, createValidator, createItem);
router.put('/:id', authMiddleware, updateValidator, updateItem);
router.delete('/:id', authMiddleware, idValidator, deleteItem);

module.exports = router;
