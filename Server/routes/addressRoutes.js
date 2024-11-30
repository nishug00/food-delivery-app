const express = require('express');
const router = express.Router();
const { addAddress, getAddresses,updateAddress,deleteAddress} = require('../Controller/addressController');
const authMiddleware = require('../middleware/auth')

// Route to add an address
router.post('/add', authMiddleware, addAddress);
router.get('/user-addresses', authMiddleware, getAddresses);
router.put('/:id',authMiddleware, updateAddress);
router.delete('/:addressId',authMiddleware, deleteAddress);



module.exports = router;
