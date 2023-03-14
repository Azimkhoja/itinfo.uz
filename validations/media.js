const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const mediaSchema = Joi.object({
    media_name: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z]{3, 50}')),
    media_file: Joi.string(),
    target_table_name: Joi.string(),
        

})

module.exports = mediaSchema