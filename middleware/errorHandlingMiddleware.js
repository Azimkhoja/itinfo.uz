const ApiError = require('../errors/ApiErrors')

module.exports = function (error, req, res, next){
    if(error instanceof ApiError){
        return res.status(error.status).send({message: error.message})
    }
    if(error.message.includes("Unexpected token ")){
        return res.send({status: error.status, message: error.message})
    }
    console.log(error);
    return res.send({status: 500, message: "Unexpected error occured"})
}