const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,  // Default value is false, meaning not the default
  }
}, { timestamps: true });

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
