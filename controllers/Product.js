const { matchedData } = require('express-validator');
const { productModel } = require('../models');

const getItems = async (request, response) => {
    const searchParams = matchedData(request);
    searchParams.name = {$regex: `.*${searchParams.name || ''}.*`};
    try {
        const data = await productModel.find(searchParams || {}).populate('category');
        response.send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const getItem = async (request, response) => {
    const { id } = matchedData(request);
    try {
        const data = await productModel.findById(id).populate('category');
        response.send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const createItem = async (request, response) => {
    const body = matchedData(request);

    try {
        const data = await productModel.create(body);
        response.status(201).send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const updateItem = async (request, response) => {
    const params = matchedData(request);
    const { id, ...body } = params;
    try {
        const data = await productModel.findOneAndUpdate({_id: id}, body, { new: true });
        response.status(200).send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const deleteItem = async (request, response) => {
    const params  = matchedData(request);
    try {
        await productModel.deleteOne({_id: params.id});
        response.status(204).send();
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
