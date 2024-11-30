const mongoose = require('mongoose'); 

const restaurantImageSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const restaurantImage = mongoose.model('restaurantImage', restaurantImageSchema, 'restaurants');
module.exports = restaurantImage;
