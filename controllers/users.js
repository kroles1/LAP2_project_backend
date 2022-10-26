const User = require('../models/User')

async function index (req, res) {
    try {
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




module.exports = {index, getById}
