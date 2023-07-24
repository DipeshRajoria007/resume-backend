import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import AppError from "./utils/AppError.js";
import globalErrorHandler from "./controllers/errorController.js";
import router from "./middlewares/routeHandlers.js";
import userRouter from "./routes/userRoutes.js";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(
    `${chalk.red("✗")} ${chalk.red("Uncaught Exception:")} ${err.name}
    :${err.message}`
  );
  console.log(`${chalk.red("✗")} ${chalk.red("Shutting down...")}`);
  process.exit(1);
});

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares and routes will be added here
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/home", (req, res) => {
  res.send("Hello World");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1", router);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 6969;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "MongoDB Connected"
        )} Server ready at http://localhost:${PORT} 🚀 `
      );
    });
  })
  .catch((err) => {
    console.error(
      `${chalk.red("✗")} ${chalk.red("MongoDB Connection Error:")} ${err}`
    );
  });

process.on("unhandledRejection", (err) => {
  console.error(
    `${chalk.red("✗")} ${chalk.red("Unhandled Rejection:")} ${err.name}:${
      err.message
    }`
  );
  console.log(`${chalk.red("✗")} ${chalk.red("Shutting down...")}`);
  app.close(() => {
    process.exit(1);
  });
});
