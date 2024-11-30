// controllers/cardController.js
const bcrypt = require('bcrypt');
const Card = require('../schemas/card.schema');
const { decrypt } = require('../utils/crypto');


// Function to save card details
const saveCard = async (req, res) => {
    const { cardNumber, expiryDate, cvv, nameOncard } = req.body;
    const userId = req.user._id;
  
    try {
      // Validate raw card number and CVV manually
      if (!/^[0-9]+$/.test(cardNumber) || cardNumber.length < 13 || cardNumber.length > 19) {
        return res.status(400).json({ message: 'Invalid card number' });
      }
      if (!/^[0-9]+$/.test(cvv) || cvv.length < 3 || cvv.length > 4) {
        return res.status(400).json({ message: 'Invalid CVV' });
      }
  
      // Hash the card number and CVV for security
      const saltRounds = 10;
      const hashedCardNumber = await bcrypt.hash(cardNumber, saltRounds);
      const hashedCVV = await bcrypt.hash(cvv, saltRounds);
  
      // Create a new card object
      const newCard = new Card({
        cardNumber: hashedCardNumber,
        expiryDate,
        cvv: hashedCVV,
        nameOncard,
        userId,
      });
  
      await newCard.save();
  
      res.status(201).json({ message: 'Card details saved successfully', card: newCard });
    } catch (error) {
      console.error('Error saving card:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getCards = async (req, res) => {
    try {
        const cards = await Card.find({ userId: req.user._id });
        const maskedCards = cards.map(card => {
            try {
        



                const decryptedCardNumber = decrypt(card.cardNumber); // Attempt decryption of card number
    

                // Ensure that the decrypted value is a string before slicing
                const last4Digits = decryptedCardNumber.slice(-4); 
           

                return {
                    ...card._doc,
                    cardNumber: last4Digits, // Mask all except last 4 digits
                    cvv: 'XXX', // Mask CVV
                };
            } catch (decryptionError) {
                console.error('Error decrypting card data:', decryptionError); // Log decryption error
                return { ...card._doc, cardNumber: 'ERROR', cvv: 'XXX' }; // Return masked card with error message
            }
        });


        res.json(maskedCards);
    } catch (error) {
        console.error('Error fetching cards:', error); // Log any errors that occur
        res.status(500).json({ message: 'Internal server error' });
    }
};

const editCard = async (req, res) => {
  try {
      const { id } = req.params; 
      console.log('Editing card with ID:', id);
      const { nameOncard, expiryDate } = req.body; 
      console.log('Updated card details:', nameOncard, expiryDate);

      const updatedCard = await Card.findByIdAndUpdate(
          id,
          { nameOncard, expiryDate },
          { new: true } // Return the updated document
      );
console.log('Updated Card:', updatedCard);
      if (!updatedCard) {
          return res.status(404).json({ message: 'Card not found' });
      }

      res.status(200).json(updatedCard);
  } catch (error) {
      console.error('Error updating card:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
const deleteCard = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedCard = await Card.findByIdAndDelete(id);
      console.log('Deleted Card:', deletedCard);

      if (!deletedCard) {
          return res.status(404).json({ message: 'Card not found' });
      }

      res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
      console.error('Error deleting card:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { saveCard , getCards,editCard ,deleteCard};
