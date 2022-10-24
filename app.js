const express = require("express");
const cors = require("cors");

const app = express()
app.use(cors());
app.use(express.json())

const userRoutes = require('./routes/users')
const habitRoutes = require('./routes/habits')

app.get('/', (req, res) => res.send('Hi everyone! its trackIT'))
app.use('/users', userRoutes)
app.use('/habits', habitRoutes)
app.use('/auth', authRoutes)

module.exports = app;
