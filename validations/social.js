const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const socialSchema = Joi.object({
    social_name: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z]{2, 50}$')),
    social_icon_file: Joi.string()
        .required()
})

module.exports = socialSchema