import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import chalk from "chalk";
import cors from "cors";
import AppError from "./utils/AppError.js";
import globalErrorHandler from "./controllers/errorController.js";
import router from "./middlewares/routeHandlers.js";
import userRouter from "./routes/userRoutes.js";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

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
// Set security HTTP headers
app.use(helmet());

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Middlewares and routes will be added here
app.use(cors());

//Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
// app.use(hpp());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serving static files
// app.use(express.static(`${__dirname}/public`));

// Routes
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
