const { matchedData } = require('express-validator');
const { userModel } = require('../models');
const { compare } = require('../support/handleCryptedText');
const { sign } = require('../support/handleJwt');

const getUser = async (request, response) => {
    const { params } = request;
    try {
        const data = await userModel.findById(params.id);
        response.send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const register = async (request, response) => {
    const params = matchedData(request);
    try {
        const user = new userModel(params);
        await user.save();
        response.status(201).send({});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const login = async (request, response) => {
    const { body } = request;
    try {
        const user = await userModel.findOne({email: body.email}).select('+password');

        if (!user) {
            throw new Error('Credenciales no válidas.');
        }

        const check = await compare(body.password, user.password);

        if (!check) {
            response.status(401).json({error: 'Credenciales no válidas.'});
            return;
        }

        response.status(201).send({
            data: {
                token: sign({_id: user._id, updatedAt: user.updatedAt}),
                user: user.set('password', undefined, { strict: false }),
            }
        });
    } catch (error) {
        console.log(error);
        response.status(400).json({error: error.message});
    }
};

const update = async (request, response) => {
    const { body, params } = request;
    try {
        await userModel.findOneAndUpdate({_id: params.id}, body);
        const data = await userModel.findById({_id: params.id});
        response.status(200).send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const deleteAccount = async (request, response) => {
    const { params } = request;
    try {
        await userModel.deleteOne({_id: params.id});
        response.status(204).send();
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = { getUser, login, register, update, deleteAccount };
