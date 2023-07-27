import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js"; // Change the path to your user model
import Post from "./models/postModel.js"; // Change the path to your post model
import { AppTypeEnum } from "./utils/enums.js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import chalk from "chalk"; // Import chalk
dotenv.config();

// Number of users you want to add
const NUM_POSTS = 100;

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.error(
    `${chalk.red("✗")} ${chalk.red("MongoDB Connection Error:")} ${err}`
  );
});

// Helper function to return a random item from an array
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

const seedDatabase = async () => {
  // First we will fetch all users from the database
  const users = await User.find();
  if (users.length === 0)
    throw new Error(
      "No users found in the database. Please run the user seeding script first."
    );

  for (let i = 0; i < NUM_POSTS; i++) {
    const randomUser = randomItem(users);
    const newPost = new Post({
      user: randomUser._id,
      text: faker.lorem.paragraph(),
      appType: randomUser.appType,
      date: faker.date.recent(),
    });

    // Log the post being created in a different color
    console.log(
      `${chalk.blue("Creating post")} ${chalk.green(i + 1)} ${chalk.blue(
        "out of"
      )} ${chalk.green(NUM_POSTS)}`
    );

    await newPost.save();
  }
  console.log(
    chalk.bold.green(`Successfully added ${NUM_POSTS} posts to the database.`)
  );
  mongoose.connection.close();
};

seedDatabase().catch((error) => {
  console.log(chalk.bold.red("Something went wrong!"), error);
  process.exit(1);
});
