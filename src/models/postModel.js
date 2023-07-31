import mongoose from "mongoose";
import { model } from "mongoose";
import { AppTypeEnum } from "../utils/enums.js";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        replies: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
          },
        ],
      },
    ],
    appType: {
      type: String,
      enum: Object.values(AppTypeEnum),
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);
PostSchema.index({ text: "text" });

export default mongoose.model("Post", PostSchema);
