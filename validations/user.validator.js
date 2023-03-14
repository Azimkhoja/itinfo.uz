const Joi = require("joi");

const UserSchema = Joi.object({
  user_name: Joi.string().required(),
  user_email: Joi.string()
    .required()
    .email()
    .message("Emailni noto'g'ri kiritildi"),
  user_password: Joi.string().required(),
  user_info: Joi.string(),
  user_photo: Joi.string(),
  });
module.exports = UserSchema;
