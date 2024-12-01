const express = require("express");
const { getReviews } = require("../Controller/reviewController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/add-review", authMiddleware, getReviews);

module.exports = router;