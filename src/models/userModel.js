import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { hashPassword } from "../utils/hashPassword.js";
import crypto from "crypto";

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
    required: [true, "A user must enter password"],
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  appType: {
    type: String,
    enum: Object.values(AppTypeEnum),
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
UserSchema.methods.comparePassword = async function (
  plainPassword,
  userPassword
) {
  return await bcrypt.compare(plainPassword, userPassword);
};
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};
UserSchema.methods.createPasswordRandomToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", UserSchema);
export default User;
