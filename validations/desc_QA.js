const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const desc_QASchema = Joi.object({
    QA_id: Joi.objectId()
        .required(),
    desc_id: Joi.objectId()
        .required()

})

module.exports = desc_QASchema