const express = require('express');
const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/Category');
const { authMiddleware } = require('../support/http/handleJwtSession')
const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', authMiddleware, createItem);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;
