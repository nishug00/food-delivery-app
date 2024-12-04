const bcrypt = require('bcrypt');
const Card = require('../schemas/card.schema');
const { decrypt } = require('../utils/crypto');

const saveCard = async (req, res) => {
  let { cardNumber, expiryDate, cvv, nameOncard } = req.body;
  cardNumber = cardNumber.trim();
  cvv = cvv.trim();
  nameOncard = nameOncard.trim();
  const userId = req.userId;
  try {
    if (!/^[0-9]+$/.test(cardNumber) || cardNumber.length < 13 || cardNumber.length > 19) {
      return res.status(400).json({ message: 'Invalid card number' });
    }
    if (!/^[0-9]+$/.test(cvv) || cvv.length < 3 || cvv.length > 4) {
      return res.status(400).json({ message: 'Invalid CVV' });
    }
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryDatePattern.test(expiryDate)) {
      return res.status(400).json({ message: 'Invalid expiry date' });
    }

    const saltRounds = 10;
    const hashedCardNumber = await bcrypt.hash(cardNumber, saltRounds);
    const hashedCVV = await bcrypt.hash(cvv, saltRounds);

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
      if (!req.userId) {
          return res.status(401).json({ message: 'User not authenticated' });
      }

      const cards = await Card.find({ userId: req.userId });
      if (!cards || cards.length === 0) {
          return res.status(404).json({ message: 'No cards found' });
      }

      const maskedCards = cards.map((card) => {
          try {
              const decryptedCardNumber = decrypt(card.cardNumber);
              const last4Digits = decryptedCardNumber.slice(-4);
              const maskedNumber = 'x'.repeat(decryptedCardNumber.length - 4) + last4Digits;

              return {
                  ...card._doc,
                  cardNumber: maskedNumber,
                  cvv: 'XXX',
              };
          } catch (error) {
              console.error('Error decrypting card data for card:', card._id, error.message);
              return {
                  ...card._doc,
                  cardNumber: 'ERROR',
                  cvv: 'XXX',
              };
          }
      });

      res.json(maskedCards);
  } catch (error) {
      console.error('Error fetching cards:', error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const editCard = async (req, res) => {
  try {
      const { id } = req.params; 
      const { nameOncard, expiryDate } = req.body; 

      const updatedCard = await Card.findByIdAndUpdate(
          id,
          { nameOncard, expiryDate },
          { new: true } 
      );
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
