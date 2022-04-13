const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: [
        {
          id: Number,
          item: String,
          amount: Number,
        },
      ],
    },
  },
  {
    collection: "users",
  }
);

exports.UserValidate = Joi.object({
  lastName: Joi.string(),
  fullName: Joi.string(),
  phoneNumber: Joi.string().pattern(new RegExp("/^0[3-9]{9}$/")),
  email: Joi.string().email(),
  password: Joi.string(),
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
