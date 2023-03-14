const {isValidObjectId} = require('mongoose')

const errorHandler = (res, error) => {
    res.status(500).send({message: `Xatolik: ${error}`})

}
function checkId(id) {
    if(id) 
        return isValidObjectId(id)  
}

module.exports = {errorHandler, checkId}