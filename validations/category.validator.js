const Joi = require('joi')

exports.categoryValidator = (data) => {
    const Schema = Joi.object({
        category_name: Joi.string()
        .min(30)
        .message("Categryname should be more than 3 char")
        .max(255)
        .required(),
    })
    return schema.validate(data)
}