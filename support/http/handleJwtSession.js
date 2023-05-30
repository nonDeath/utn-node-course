const { userModel } = require('../../models');
const { verify } = require('../handleJwt');

const authMiddleware = (request, response, next) => {
    const { headers } = request;
    try {
        if (!headers.authorization) {
            throw new Error('Se necesita un token válido.');
        }

        const token = headers.authorization.split(' ').pop();
        const data = verify(token);

        if (!data) {
            throw new Error('No autorizado.');
        }

        const user = userModel.findById(data?._id);

        if (!user) {
            throw new Error('Usuario no válido.');
        }

        request.user = user;

        next();
    } catch (error) {
        console.log(error);
        response.status(401).json({error: error.message});
    }
}

module.exports = { authMiddleware };
