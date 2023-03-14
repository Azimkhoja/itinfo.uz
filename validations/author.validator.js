const Joi = require('joi');

exports.Validation = data => {
    const schema = Joi.object({
        fname: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,50}$'))
            .required(),
        lname: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,50}$'))
            .required(),
        nicname: Joi.string()
            .required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required().pattern(/\d{2} \d{3} \d{2} \d{2}/),
        password: Joi.string().required().min(6).max(30),
        info: Joi.string().required(),
        position: Joi.string().required(),
        photo: Joi.string().default("/default.png").required(),
        is_expert: Joi.boolean().default(false)       
    })
    return schema.validate(data)
}