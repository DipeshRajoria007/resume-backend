import User from "./models/userModel.js";
import Post from "./models/postModel.js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chalk from "chalk";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.error(
    `${chalk.red("✗")} ${chalk.red("MongoDB Connection Error:")} ${err}`
  );
});

// Helper function to return a random item from an array
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

async function addComment(postId, userId, commentText) {
  const comment = {
    user: userId,
    text: commentText,
    date: new Date(),
    replies: [],
  };

  try {
    await Post.updateOne({ _id: postId }, { $push: { comments: comment } });
    console.log(
      `${chalk.green("✔")} Comment added to post ${chalk.yellow(postId)}`
    );

    await User.updateOne({ _id: userId }, { $push: { posts: postId } });
    console.log(
      `${chalk.green("✔")} Post ${chalk.yellow(
        postId
      )} added to user ${chalk.yellow(userId)} posts`
    );
  } catch (err) {
    console.error(
      `${chalk.red("✗")} Failed to add comment and update user posts:`,
      err
    );
  }
}

async function addCommentsToAllPosts() {
  try {
    const posts = await Post.find();
    const users = await User.find();

    for (const post of posts) {
      const commentText = faker.lorem.sentences(); // generate random comment text
      const user = users[Math.floor(Math.random() * users.length)]; // pick a random user
      await addComment(post._id, user._id, commentText);
    }
    console.log(`${chalk.bold.green("✔ All comments added successfully")}`);
  } catch (err) {
    console.error(`${chalk.red("✗")} Failed to add comments:`, err);
  }
}

// Run the script
addCommentsToAllPosts();
