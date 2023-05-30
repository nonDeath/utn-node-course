const { checkSchema } = require('express-validator');
const { validate } = require('../support/http/handleValidation');

const searchValidator = [
    checkSchema({
        featured: {
            trim: true,
            toBoolean: true,
            isBoolean: true,
            optional: true,
        },
        name: {
            trim: true,
            optional: true,
            isLength: {
                options: { max: 255 },
            },
        },
        code: {
            trim: true,
            optional: true,
            isLength: {
                options: { max: 60 },
            },
        },
    }),
    (req, res, next) => validate(req, res, next)
];

const createValidator = [
    checkSchema({
        name: {
            trim: true,
            notEmpty: true,isLength: {
                options: { max: 160 },
            },
        },
        code: {
            trim: true,
            notEmpty: true,isLength: {
                options: { max: 60 },
            },
            isAlphanumeric: true,
        },
        price: {
            trim: true,
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Debe ser como mínimo cero.',
            },
        },
        quantity: {
            trim: true,
            isInt: {
                errorMessage: 'Debe ser como mínimo cero.',
                options: { min: 0, allow_leading_zeroes: false },
            },
        },
        description: {
            trim: true,
            notEmpty: false,
            isLength: {
                options: { max: 255 },
            },
        },
        category: {
            trim: true,
            exists: true,
            isMongoId: true,
        },
        featured: {
            trim: true,
            optional: true,
            toBoolean: true,
            isBoolean: true,
            default: false,
        },
    }),
    (req, res, next) => validate(req, res, next)
];

const updateValidator = [
    checkSchema({
        id: {
            trim: true,
            exists: true,
            isMongoId: true,
        },
        name: {
            trim: true,
            notEmpty: true,isLength: {
                options: { max: 160 },
            },
        },
        code: {
            trim: true,
            notEmpty: true,isLength: {
                options: { max: 60 },
            },
            isAlphanumeric: true,
        },
        price: {
            trim: true,
            isFloat: {
                options: { min: 0 },
                errorMessage: 'Debe ser como mínimo cero.',
            },
        },
        quantity: {
            trim: true,
            isInt: {
                errorMessage: 'Debe ser como mínimo cero.',
                options: { min: 0, allow_leading_zeroes: false },
            },
        },
        description: {
            trim: true,
            notEmpty: false,
            isLength: {
                options: { max: 255 },
            },
        },
        category: {
            trim: true,
            exists: true,
            isMongoId: true,
        },
        featured: {
            trim: true,
            optional: true,
            toBoolean: true,
            isBoolean: true,
            default: false,
        },
    }),
    (req, res, next) => validate(req, res, next)
];

module.exports = { searchValidator, createValidator, updateValidator };
