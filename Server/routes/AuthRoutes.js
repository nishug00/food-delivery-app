const express = require("express");
const { signup, signin,updateProfile, getUserDetails } = require("../controller/AuthController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put('/update', authMiddleware, updateProfile);
router.get('/getUserDetails', authMiddleware, getUserDetails);


module.exports = router;
