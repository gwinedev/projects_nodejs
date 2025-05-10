const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: String,
    required: [true, "Please provide rating"],
  },
  comment: {
    type: String,
    required: [true, "Please provide comment"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide userId"],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Please provide ProductId"],
  },
});

module.exports = mongoose.model("Review", reviewSchema);
