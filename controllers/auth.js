const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const db = require("../dbConfig/init.js");
const User = require('../models/User');

async function register (req, res) {
    try {
        let existedUser = await db.query(`SELECT * FROM users WHERE email = $1;`,[req.body.email])
        if(existedUser.rows[0]) throw new Error('email address already used')
        existedUser = await User.findByUserName(req.body.username)
        if(existedUser) throw new Error('User name already used')
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({...req.body, password: hashed})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message)
    }
}

async function login (req, res) {
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){ throw new Error('No user with this email') }
        const authed = await bcrypt.compare(req.body.password, user.password)
        console.log(authed);
        if (!!authed){
            const payload = {id: user.id, username: user.username, email: user.email}
            const sendToken = ( err, token ) => {
                if (err) { throw new Error('Error in token generation')}
                res.status(200).json({
                    success: true,
                    token: token
                })
            }
            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'24h'}, sendToken)
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ err: err.message });
    }
}

module.exports = { login, register }
