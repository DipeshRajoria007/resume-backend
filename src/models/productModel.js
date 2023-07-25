import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Product", ProductSchema);
// as you have the reference to user schema in wihch there is a field apptype, i want to produce random data of products ( ecommerce products )  apptype = ecommerce ,
