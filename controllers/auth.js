const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const User = require('../models/User');

async function register (req, res) {
    try {
        console.log("hitting users register route");
        // let existedUser = await User.findByEmail(req.body.email)
        // console.log(existedUser);
        // if(existedUser) throw new Error('email address already used')

        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({...req.body, password: hashed})
        console.log(user);
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

async function login (req, res) {
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){ throw new Error('No user with this email') }
        const authed = bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            console.log(user);
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
        res.status(401).json({ err: err.message });
    }
}

module.exports = { login, register }
