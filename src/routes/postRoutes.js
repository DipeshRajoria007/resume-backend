import express from "express";
import chalk from "chalk";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { AppTypeEnum } from "../utils/enums.js";
import { protect } from "../middlewares/authMiddleware.js";
import { restrictTo } from "../middlewares/restrictToMiddleware.js";
import postController from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/:id", postController.getOnePost);
postRouter.get("/all", postController.getAllPosts);
export default postRouter;
