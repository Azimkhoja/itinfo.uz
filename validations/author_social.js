const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const author_socialSchema = Joi.object({
    author_id: Joi.objectId()
        .required(),
    social_id: Joi.objectId()
        .required(),
    social_link: Joi.string()
        .required()
})

module.exports = author_socialSchema