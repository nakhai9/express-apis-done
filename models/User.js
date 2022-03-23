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

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
