const express = require("express");
const authMiddleware = require("../middleware/auth");
const { saveCard ,getCards, editCard, deleteCard} = require("../Controller/cardController");

const router = express.Router();

router.post("/save-card", authMiddleware, saveCard);
router.get("/get-cards", authMiddleware, getCards);
router.put('/edit-card/:id',authMiddleware, editCard); 
router.delete('/delete-card/:id',authMiddleware, deleteCard); 


module.exports = router;
