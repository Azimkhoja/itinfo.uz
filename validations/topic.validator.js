const Joi = require("joi");

const topicSchema = Joi.object({
    topic_title: 
        Joi.string()
        .min(5)
        .required(),
    topic_text: 
        Joi.string()
        .required(),
    is_checked: 
        Joi.boolean()
        .required()
        .default(false),
    is_approved: 
        Joi.boolean()
        .default(false),
});
module.exports = topicSchema;
