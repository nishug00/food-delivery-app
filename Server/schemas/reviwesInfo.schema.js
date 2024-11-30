const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  reviewedDate: {
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
  review: {
    type: String,
    required: true
  }
});

const Review = mongoose.model('Reviews', ReviewSchema);

module.exports = Review;
