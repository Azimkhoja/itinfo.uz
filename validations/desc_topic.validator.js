const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const desc_topicSchema = Joi.object({
    desc_id: Joi.objectId()
        .required(),
    topic_id: Joi.objectId()
        .required(),
        
});
module.exports = desc_topicSchema;
