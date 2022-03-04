const jwt = require('jsonwebtoken')
const User = require('../models/user')

const RouteErrorHandler = (err, req, res, next) => {
    console.log(err.name)
    if(err.name === "ValidationError"){
        return res.status(400).json({error: err.message})
    }
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
          error: 'invalid token'
        })
    }
    
    next(err)
}

const VerifyToken = async (request, response, next) => {
  const authorization = request.get('authorization')
  let token;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  } else {
    const err = new Error("Invalid auth token")
    err.name = "JsonWebTokenError"
    throw err;
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  request.userId = decodedToken.id
  request.user = await User.findById(decodedToken.id)

  next()
}

module.exports = {RouteErrorHandler, VerifyToken}