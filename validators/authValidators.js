const { checkSchema } = require('express-validator');
const { validate } = require('../support/http/handleValidation');

const loginValidator = [
    checkSchema({
        email: {
            trim: true,
            isEmail: true,
            notEmpty: true,
        },
        password: {
            trim: true,
            notEmpty: true,
        },
    }),
    (req, res, next) => validate(req, res, next)
];

const registerValidator = [
    checkSchema({
        "name.first": {
            trim: true,
            notEmpty: true,
            isLength: {
                options: { max: 80 },
            },
        },
        "name.last": {
            trim: true,
            notEmpty: true,
            isLength: {
                options: { max: 80 },
            },
        },
        email: {
            trim: true,
            isEmail: true,
            notEmpty: true,
        },
        password: {
            trim: true,
            notEmpty: true,
        },
    }),
    (req, res, next) => validate(req, res, next)
];

module.exports = { loginValidator, registerValidator };
