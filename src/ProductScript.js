import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js"; // Change the path to your user model
import Post from "./models/postModel.js"; // Change the path to your post model
import Product from "./models/productModel.js"; // Change the path to your post model
import { AppTypeEnum } from "./utils/enums.js";
import { CategoryEnum } from "./utils/enums.js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();
// Number of users you want to add
const NUM_POSTS = 100;

// Connect to your database
// mongoose.connect("mongodb://localhost:27017/myapp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.error(
    `${chalk.red("✗")} ${chalk.red("MongoDB Connection Error:")} ${err}`
  );
});

// Helper function to return a random item from an array
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

const seedProducts = async () => {
  // Get all users with appType of "ecommerce"
  const users = await User.find({ appType: "ecommerce" });

  if (!users || users.length === 0) {
    console.log("No ecommerce users found. Make sure to seed users first.");
    return;
  }

  // For each user, create random products
  const products = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 5; j++) {
      // 5 products per user, adjust as necessary
      const product = new Product({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        appType: "ecommerce",
        category: faker.helpers.arrayElement(Object.values(CategoryEnum)),
        images: Array.from({ length: 5 }, () => faker.image.url()), // 5 images per product
        ratings: faker.number.int({ min: 0, max: 5 }), // ratings out of 5
        createdAt: Date.now(),
        createdBy: users[i]._id,
      });

      products.push(product);
    }
  }

  // Save all the products to the database
  try {
    await Product.insertMany(products);
    console.log(
      `Successfully added ${products.length} products to the database.`
    );
  } catch (error) {
    console.error(`Failed to seed products: ${error.message}`);
  }
};

seedProducts().catch((error) => {
  console.log("Something went wrong!", error);
  process.exit(1);
});
