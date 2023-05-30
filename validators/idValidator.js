const { check } = require('express-validator');
const { validate } = require('../support/http/handleValidation');

const idValidator = [
    check('id').exists().isMongoId(),
    (req, res, next) => {
        validate(req, res, next);
    },
];

module.exports = idValidator;
