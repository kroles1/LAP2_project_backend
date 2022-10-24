const User = require('../models/User')

async function index (req, res) {
    try {

    } catch (err) {

    }
}

async function getById (req, res) {
    try {

    } catch (err) {
        
    }
}

async function create (req, res) {
    try {

    } catch (err) {
        
    }
}

async function edit (req, res) {
    try {
        // fetch habit data
        // check habit difficulty
        // if diff = easy, exp = 10 // medium, exp = 20
        // set variable "increase" to 10/20/..
        // check how close to next level
        // calculate difference to next level
        // if (User.exp +  increase)  > exp required for next level    ->   increase =  remaining exp after leveling , level + 1
        // User.edit(increase, levelup (bool))
    } catch (err) {
        
    }
}

// async function destroy (req, res) {
//     try {

//     } catch (err) {
        
//     }
// }
module.exports = {index, create, getById, edit}
