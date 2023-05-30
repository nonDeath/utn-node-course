const { validationResult } = require('express-validator');


const validate = async (request, response, next) => {
    try {
        validationResult(request).throw();
        next();
    } catch (error) {
        response.status(422).send({ errors: error.mapped() });
    }
};

module.exports = { validate };