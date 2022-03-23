const mongoose = require("mongoose");

const WatchSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    color: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    quantities: {
      type: Number,
    },
    categories: {
      type: [],
    },
    href: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    collection: "watches",
  }
);

const WatchModel = mongoose.model("watches", WatchSchema);

module.exports = WatchModel;
