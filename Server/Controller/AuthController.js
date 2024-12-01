const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user.schema");
const { get } = require("mongoose");
const { generateToken } = require("../utils/jwtUtils");

const signup = async (req, res) => {
  try {
    const { email, password, name, phone, gender, address, country } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      phone,
      gender,
      address,
      country,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, gender, country } = req.body;
  const userId = req.user._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        gender,
        country,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

const getUserDetails = async (req, res) => {
  try {
      const userId = req.userId;  // Ensure this is populated
      console.log('User ID:', userId);  // Log userId for debugging
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  signup,
  signin,
  updateProfile,
  getUserDetails,
};
