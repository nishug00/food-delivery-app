const Address = require('../schemas/address.schema');

exports.addAddress = async (req, res) => {
    try {
        const { fullAddress, phoneNumber, state, city, pincode } = req.body;
        const userId = req.userId; // Ensure this line correctly fetches the user ID from the request
        if (!userId) {
            return res.status(400).json({ message: "User ID not found in request" });
        }

        // Check if there is already a default address
        const existingDefaultAddress = await Address.findOne({ userId, isDefault: true });

        let newAddress = new Address({
            userId,
            fullAddress,
            phoneNumber,
            state,
            city,
            pincode,
            isDefault: !existingDefaultAddress,
        });

        await newAddress.save();
        res.status(201).json(newAddress);
    } catch (err) {
        res.status(500).json({ message: "Error adding address", error: err.message });
    }
};

  // Get all addresses for a user
  exports.getAddresses = async (req, res) => {
    try {
        const userId = req.userId; // Use the userId from the authMiddleware
        
        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const addresses = await Address.find({ userId });
        const sortedAddresses = addresses.sort((a, b) => b.isDefault - a.isDefault);

        res.status(200).json(sortedAddresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

  
  exports.updateAddress = async (req, res) => {
    try {
      const addressId = req.params.id; 
      const address = await Address.findById(addressId);
      if (!address) {
        return res.status(404).json({ error: 'Address not found' });
      }
      const updatedAddress = await Address.findByIdAndUpdate(addressId, req.body, { new: true });
      return res.status(200).json({ address: updatedAddress });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update address' });
    }
  };

  exports.deleteAddress = async (req, res) => {
    const { addressId } = req.params; 
    try {
      const address = await Address.findByIdAndDelete(addressId);
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }

      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

 