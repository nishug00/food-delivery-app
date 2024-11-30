const mongoose = require('mongoose'); 

const foodImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    imageUrl: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    restaurantCount: {
        type: Number, 
        required: true,
        default: 0,
      },
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', foodImageSchema);
module.exports = Image;
