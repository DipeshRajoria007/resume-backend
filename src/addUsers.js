import User from "./models/userModel.js";
import Post from "./models/postModel.js";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chalk from "chalk";
import { AppTypeEnum, GenratedByEnum } from "./utils/enums.js";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.error(
    `${chalk.red("✗")} ${chalk.red("MongoDB Connection Error:")} ${err}`
  );
});

// Helper function to return a random item from an array
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];
const NUM_USERS = 100;

const seedDatabase = async () => {
  console.log(chalk.bold.yellow("Seeding the database..."));

  for (let i = 0; i < NUM_USERS; i++) {
    const password = await bcrypt.hash(faker.internet.password(), 10);
    const newUser = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: password,
      genratedBy: GenratedByEnum.NS,
      projectId: "qwertyuiop",
      appType: randomItem(Object.values(AppTypeEnum)),
      profileImage: faker.image.avatar(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
    });

    await newUser.save();
    console.log(chalk.green(`User ${i + 1}/${NUM_USERS} created and saved.`));
  }

  console.log(
    chalk.bold.green(`Successfully added ${NUM_USERS} users to the database.`)
  );
  mongoose.connection.close();
};

seedDatabase().catch((error) => {
  console.log(chalk.bold.red("Something went wrong!"), error);
  process.exit(1);
});
