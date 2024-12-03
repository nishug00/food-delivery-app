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
        req.userId = decoded.id; 

        next();
    } catch (error) {
        console.error("Error verifying token:", error.message);
        res.status(401).json({ message: "User is not logged in" });
    }
};

module.exports = authMiddleware;


