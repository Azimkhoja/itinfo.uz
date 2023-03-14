const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const descriptionSchema = Joi.object({
    category_id: Joi.objectId()
        .required(),
    description: Joi.string()
        .required()
        
})

module.exports = descriptionSchema