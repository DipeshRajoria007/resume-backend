import express from "express";
import chalk from "chalk";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { AppTypeEnum } from "../utils/enums.js";
import { protect } from "../middlewares/authMiddleware.js";
import { restrictTo } from "../middlewares/restrictToMiddleware.js";
import checkProjectId from "../middlewares/checkProjectId.js";

const userRouter = express.Router();

userRouter.post("/signup", checkProjectId, authController.signup);
userRouter.post("/login", checkProjectId, authController.login);
userRouter.post("/forgotPassword", authController.forgotPassword);
// userRouter.patch("/resetPassword/:token", authController.resetPassword);
userRouter.patch(
  "/updateMyPassword",
  checkProjectId,
  protect,
  authController.updatePassword
);
userRouter.patch("/updateMe", checkProjectId, protect, userController.updateMe);
userRouter.delete(
  "/deleteMe",
  checkProjectId,
  protect,
  userController.deleteMe
);
// userRouter.get("/me", protect, userController.getMe, userController.getUser);
// userRouter.get("/verifyEmail/:token", authController.verifyEmail);
// userRouter.get("/resendVerifyEmail", protect, authController.resendVerifyEmail);
// userRouter
//   .route("/")
//   .get(protect, restrictTo(AppTypeEnum.ADMIN), userController.getAllUsers)
//   .post(protect, restrictTo(AppTypeEnum.ADMIN), userController.createUser);
// userRouter

//   .route("/:id")
//   .get(protect, restrictTo(AppTypeEnum.ADMIN), userController.getUser)
//   .patch(protect, restrictTo(AppTypeEnum.ADMIN), userController.updateUser)

//   .delete(protect, restrictTo(AppTypeEnum.ADMIN), userController.deleteUser);

export default userRouter;
