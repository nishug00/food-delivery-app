// controllers/cardController.js
const bcrypt = require('bcrypt');
const Card = require('../schemas/card.schema');
const { decrypt } = require('../utils/crypto');


// Function to save card details
const saveCard = async (req, res) => {
  let { cardNumber, expiryDate, cvv, nameOncard } = req.body;
  
  // Trim card data to remove any leading or trailing spaces
  cardNumber = cardNumber.trim();
  cvv = cvv.trim();
  nameOncard = nameOncard.trim();

  console.log('Received card details:', cardNumber, expiryDate, cvv, nameOncard);

  const userId = req.userId;
  console.log('User ID:', userId);

  try {
    // Validate raw card number and CVV manually
    if (!/^[0-9]+$/.test(cardNumber) || cardNumber.length < 13 || cardNumber.length > 19) {
      console.log('Invalid card number:', cardNumber);
      return res.status(400).json({ message: 'Invalid card number' });
    }
    if (!/^[0-9]+$/.test(cvv) || cvv.length < 3 || cvv.length > 4) {
      console.log('Invalid CVV:', cvv);
      return res.status(400).json({ message: 'Invalid CVV' });
    }

    // Validate expiry date (MM/YY format)
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY format
    if (!expiryDatePattern.test(expiryDate)) {
      console.log('Invalid expiry date:', expiryDate);
      return res.status(400).json({ message: 'Invalid expiry date' });
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

    console.log('New Card:', newCard);
    await newCard.save();

    res.status(201).json({ message: 'Card details saved successfully', card: newCard });
  } catch (error) {
    console.error('Error saving card:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  
const getCards = async (req, res) => {
  try {
      // Ensure that req.userId exists and is valid
      if (!req.userId) {
          return res.status(401).json({ message: 'User not authenticated' });
      }

      // Fetch cards based on userId
      const cards = await Card.find({ userId: req.userId });

      if (!cards || cards.length === 0) {
          return res.status(404).json({ message: 'No cards found' });
      }

      // Process the cards (e.g., decrypting the card number)
      const maskedCards = cards.map(card => {
          try {
              const decryptedCardNumber = decrypt(card.cardNumber); // Decrypt the card number
              const last4Digits = decryptedCardNumber.slice(-4); // Get the last 4 digits
              const maskedNumber = 'x'.repeat(decryptedCardNumber.length - 4) + last4Digits; // Mask all but last 4 digits

              return {
                  ...card._doc,
                  cardNumber: maskedNumber, // Fully masked card number
                  cvv: 'XXX', // Mask the CVV
              };
          } catch (decryptionError) {
              console.error('Error decrypting card data:', decryptionError);
              return { ...card._doc, cardNumber: 'ERROR', cvv: 'XXX' }; // Return error message for the card
          }
      });

      // Return the processed cards
      res.json(maskedCards);
  } catch (error) {
      console.error('Error fetching cards:', error);
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
