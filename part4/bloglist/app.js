const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const { RouteErrorHandler } = require('./utils/middlewares')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(RouteErrorHandler)

module.exports = app