const mongoose = require('mongoose');

// Reusable Image Schema for consistency
const imageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Schema for Burgers
const burgerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: imageSchema,
      required: true
    }
  },
  { timestamps: true }
);

// Schema for Fries
const friesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: imageSchema,
      required: true
    }
  },
  { timestamps: true }
);

// Schema for Drinks
const drinksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: imageSchema,
      required: true
    }
  },
  { timestamps: true }
);

// Creating Mongoose models
const Burger = mongoose.model('Burger', burgerSchema);
const Fries = mongoose.model('Fries', friesSchema);
const Drinks = mongoose.model('Drinks', drinksSchema);

// Exporting all models from a single file
module.exports = { Burger, Fries, Drinks };
