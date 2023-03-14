const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const question_answerSchema = Joi.object({
    question: Joi.string()
        .required(),
    answer: Joi.string()
        .required(),
    is_checked: Joi.boolean(),
    expert_id: Joi.objectId()
        .required(),
})

module.exports = question_answerSchema