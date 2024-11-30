const express = require("express");
const authMiddleware = require("../middleware/auth");
const { saveCard ,getCards, editCard, deleteCard} = require("../Controller/cardController");

const router = express.Router();

router.post("/save-card", authMiddleware, saveCard);
router.get("/get-cards", authMiddleware, getCards);
router.put('/edit-card/:id', editCard); 
router.delete('/delete-card/:id', deleteCard); 


module.exports = router;
