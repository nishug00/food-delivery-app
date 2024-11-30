const express = require("express");
const { getFoodImages, getRestaurantImages ,getBurgersMenu, getFriesMenu, getDrinksMenu} = require("../Controller/imageController");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/food-images", authMiddleware, getFoodImages);
router.get("/restaurant-images", authMiddleware, getRestaurantImages);
router.get("/burgers-menu", authMiddleware, getBurgersMenu);
router.get("/fries-menu", authMiddleware, getFriesMenu);
router.get("/drinks-menu", authMiddleware, getDrinksMenu);

module.exports = router;
