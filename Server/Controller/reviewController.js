const Review = require("../schemas/reviwesInfo.schema");

const getReviews = async (req, res) => {
    try {
        const images = await Review.find();
        console.log("Fetched reviews:", images);  // Log the fetched reviews data
        res.status(200).json({ success: true, data: images });
    } catch (error) {
        console.error("Error fetching reviews:", error);  // Log any errors encountered
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { getReviews };
