const { Schema, model } = require("mongoose");

// Mongoose Card schema { title, link, description }
const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
