const Joi = require('joi')

const emailPassSchema = Joi.object({
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(5).max(20).required()
})

module.exports = emailPassSchema