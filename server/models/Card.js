const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
  },
  {}
);

const Card = model("Card", cardSchema);

module.exports = Card;
