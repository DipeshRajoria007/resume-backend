import express from "express";
import chalk from "chalk";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { AppTypeEnum } from "../utils/enums.js";
import { protect } from "../middlewares/authMiddleware.js";
import { restrictTo } from "../middlewares/restrictToMiddleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/updateMyPassword", protect, authController.updatePassword);
router.patch("/updateMe", protect, userController.updateMe);
router.delete("/deleteMe", protect, userController.deleteMe);
router.get("/me", protect, userController.getMe, userController.getUser);
router.get("/verifyEmail/:token", authController.verifyEmail);
router.get("/resendVerifyEmail", protect, authController.resendVerifyEmail);
router
  .route("/")
  .get(protect, restrictTo(AppTypeEnum.ADMIN), userController.getAllUsers)
  .post(protect, restrictTo(AppTypeEnum.ADMIN), userController.createUser);
router

  .route("/:id")
  .get(protect, restrictTo(AppTypeEnum.ADMIN), userController.getUser)
  .patch(protect, restrictTo(AppTypeEnum.ADMIN), userController.updateUser)

  .delete(protect, restrictTo(AppTypeEnum.ADMIN), userController.deleteUser);

export default router;
// Compare this snippet from src/controllers/userController.js:
// import User from "../models/userModel.js";
// import catchAsync from "../utils/catchAsync.js";
// import AppError from "../utils/AppError.js";
// import { AppTypeEnum } from "../utils/enums.js";
// import { filterObj } from "../utils/filterObj.js";
//
// export const getAllUsers = catchAsync(async (req, res, next) => {
//   const users = await User.find();
//   res.status(200).json({
//     status: "success",
//     results: users.length,
//     data: {  users },
//   });
// });
//
// export const getUser = catchAsync(async (req, res, next) => {
