const { categoryModel } = require('../models');

const getItems = async (request, response) => {
    try {
        const data = await categoryModel.find({});
        response.send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const getItem = async (request, response) => {
    const { params } = request;
    try {
        const data = await categoryModel.findById(params.id);
        response.send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const createItem = async (request, response) => {
    const { body } = request;
    try {
        const data = await categoryModel.create(body);
        response.send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const updateItem = async (request, response) => {
    const { body, params } = request;
    try {
        await categoryModel.findOneAndUpdate({_id: params.id}, body);
        const data = await categoryModel.findById({_id: params.id});
        response.status(200).send({data});
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const deleteItem = async (request, response) => {
    const { params } = request;
    try {
        await categoryModel.deleteOne({_id: params.id});
        response.status(204).send();
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
