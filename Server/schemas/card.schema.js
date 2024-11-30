const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Skip validation if the value is hashed (starts with "$2b$")
          return v.startsWith('$2b$') || /^[0-9]+$/.test(v);
        },
        message: props => `${props.value} is not a valid card number!`,
      },
    },
    expiryDate: {
      type: String,
      required: true,
      match: /^(0[1-9]|1[0-2])\/\d{2}$/, // Match MM/YY format
    },
    cvv: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Skip validation if the value is hashed (starts with "$2b$")
          return v.startsWith('$2b$') || /^[0-9]+$/.test(v);
        },
        message: props => `${props.value} is not a valid CVV!`,
      },
    },
    nameOncard: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
