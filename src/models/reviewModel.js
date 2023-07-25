import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: Number,
  text: String,
});
export default mongoose.model("Review", ReviewSchema);
