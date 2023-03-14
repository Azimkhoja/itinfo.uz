const Joi = require('joi')

const dictionarySchema = Joi.object({
    term: Joi.string()
        .required()
        .max(60).min(1)
})

module.exports = dictionarySchema