const RouteErrorHandler = (err, req, res, next) => {
    console.log(err.name)
    if(err.name === "ValidationError"){
        return res.status(400).json({error: err.message})
    }
    next(err)
}

module.exports = {RouteErrorHandler}