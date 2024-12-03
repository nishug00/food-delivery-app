// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const AuthRoutes = require("./routes/AuthRoutes");
const imageRoutes = require("./routes/imageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const addressRoutes = require('./routes/addressRoutes');
const cardRoutes = require('./routes/cardRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');

console.log('Allowed Origins:', allowedOrigins); // Verify it logs correctly

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", AuthRoutes);
app.use("/api", imageRoutes);
app.use("/api", reviewRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/card', cardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
