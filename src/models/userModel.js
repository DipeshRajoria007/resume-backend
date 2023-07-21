import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const AppTypeEnum = Object.freeze({
  FAST_ECOMMERCE: "fast_ecommerce",
  ECOMMERCE: "ecommerce",
  COMMUNITY: "community",
  SOCIAL_MEDIA: "social_media",
  BOOKING: "booking",
});
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have an email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
  },
  appType: {
    type: String,
    enum: Object.values(AppTypeEnum),
    required: true,
  },
  profileImage: String,
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
  address: String,
  phone: String,
  paymentDetails: {
    cardNumber: String,
    expirationDate: String,
    cvv: Number,
  },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});
const User = mongoose.model("User", UserSchema);
export default User;
