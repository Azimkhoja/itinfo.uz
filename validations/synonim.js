const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const synonimSchema = Joi.object({
    desc_id: Joi.objectId()
        .required(),
    dict_id: Joi.objectId()
        .required()
})

module.exports = synonimSchema