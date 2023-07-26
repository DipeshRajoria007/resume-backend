import mongoose from "mongoose";
import { AppTypeEnum } from "../utils/enums.js";
import { CategoryEnum } from "../utils/enums.js ";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  appType: {
    type: String,
    enum: Object.values(AppTypeEnum),
    required: [true, "Product must have an appType"],
  },
  category: {
    type: String,
    enum: Object.values(CategoryEnum),
    required: [true, "Product must have a category"],
  },
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
