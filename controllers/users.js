const User = require('../models/User')

async function index (req, res) {
    try {
        console.log('getting all users')
        const users = await User.all
        res.status(200).json(users)
    } catch (err) {
        console.log(err);
        res.status(500).json({err})
    }
}

async function getById (req, res) {
    try {
        const user = await User.getById(req.params.id)
        console.log(user);
        res.status(200).json(user)
    } catch (err) {
        console.log("error to handle",err.message);
        res.status(404).json({err})
    }
}


async function edit (req, res) {
    try {
        const user = await User.edit(req.body)
        res.status(201).json(user)
    } catch (err) {
        console.log(err);
        res.status(422).json({err})
    }
}

async function updateUserXp(userId, xp) {
    try {
        const user = await User.getById(userId)
        const upatedXp = await user.upateXp(exp)
    } catch (err) {
        res.status(400).json(err)
    }
}



module.exports = {index, getById, edit}
