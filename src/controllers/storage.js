const { matchedData } = require("express-validator");
const { storageModel } = require("../models/storage")
const { handleHttpError } = require('../utils/handleError')

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
};
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.findById(id)
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_DETAIL_ITEMS')
    }
};
const createItem = async (req, res) => {
    try {
        const { file } = req
        const fileData = {
            url: `${PUBLIC_URL}/${file.filename}`,
            filename: file.filename
        }
        const data = await storageModel.create(fileData)
        res.send({ data })
        res.redirect('/torneo');
    } catch (e) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS33')
    }


};

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const dataFile = await storageModel.findById(id)
        await storageModel.delete({ _id: id }) //Change deleteOne(id) by .delete({_id:id}) for soft delete 
        const { filename } = dataFile
        const filePath = `${MEDIA_PATH}/${filename}`

        //fs.unlinkSync(filePath)   //comment for soft delete
        const data = {
            filePath,
            deleted: 1
        }

        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_DELETE_ITEMS')
    }
};




module.exports = { getItems, getItem, createItem, deleteItem };