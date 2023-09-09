const { matchedData } = require('express-validator')

const User = require('../models/User');

const getItems = async (req, res) => {
    try {
        const user = req.user
        const data = await User.find({})
        res.send({ data, user });
    } catch (e) {
        console.log(e)
    }
};
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        const data = await User.findOneAndUpdate(id, body)
        res.send({ data })
    } catch (e) {
        console.log(e)
    }
};

module.exports = { getItems, updateItem };