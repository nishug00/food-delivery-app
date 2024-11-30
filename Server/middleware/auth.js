const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "User is not logged in" });
    }

    if (!token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const tokenValue = token.split(" ")[1];
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

        // Instead of req.userId, set req.user with the decoded user info
        req.user = { _id: decoded.id };  // Assuming the 'id' is in the payload

        next();
    } catch (error) {
        console.error("Error verifying token:", error.message);
        res.status(401).json({ message: "User is not logged in" });
    }
};

module.exports = authMiddleware;


