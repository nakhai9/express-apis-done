const joi = require("joi");
exports.UserLoginSchema = joi.object({
  phoneNumber: joi.string().max(10).required(),
  password: joi.string().required(),
});
