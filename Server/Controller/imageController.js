const { Burger, Fries, Drinks } = require("../schemas/Menu.schema");
const RestaurantImage = require("../schemas/restaurantImage.schema");
const FoodImage = require("../schemas/foodImage.schema");

const getFoodImages = async (req, res) => {
  try {
    const images = await FoodImage.find();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getRestaurantImages = async (req, res) => {
  try {
    const images = await RestaurantImage.find();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error("Error fetching restaurant images:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getBurgersMenu = async (req, res) => {
  try {
    const burgers = await Burger.find();
    res.status(200).json({ success: true, data: burgers });
  } catch (error) {
    console.error("Error fetching burgers menu:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getFriesMenu = async (req, res) => {
  try {
    const fries = await Fries.find();
    res.status(200).json({ success: true, data: fries });
  } catch (error) {
    console.error("Error fetching fries menu:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getDrinksMenu = async (req, res) => {
  try {
    const drinks = await Drinks.find();
    res.status(200).json({ success: true, data: drinks });
  } catch (error) {
    console.error("Error fetching drinks menu:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getFoodImages,
  getRestaurantImages,
  getBurgersMenu,
  getFriesMenu,
  getDrinksMenu,
};
