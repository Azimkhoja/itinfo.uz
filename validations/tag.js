const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const tagSchema = Joi.object({
    topic_id: Joi.objectId()
        .required(),
    category_id: Joi.objectId()
        .required()
})

module.exports = tagSchema