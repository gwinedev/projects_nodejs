const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Error creating a review" });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await find().populate("userId").populate("productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};
module.exports = { createReview, getReviews };
