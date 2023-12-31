import express from "express";
import chalk from "chalk";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { AppTypeEnum } from "../utils/enums.js";
import { protect } from "../middlewares/authMiddleware.js";
import { restrictTo } from "../middlewares/restrictToMiddleware.js";
import checkProjectId from "../middlewares/checkProjectId.js";
import { upload } from "../utils/s3Upload.js";

const userRouter = express.Router();

// userRouter.route("")
userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.post("/forgotPassword", authController.forgotPassword);
// userRouter.patch("/resetPassword/:token", authController.resetPassword);
userRouter.patch("/updateMyPassword", protect, authController.updatePassword);
userRouter.patch("/updateMe", checkProjectId, protect, userController.updateMe);
userRouter.patch(
  "/updateProfileImage",
  protect,
  upload.single("profileImage"),
  userController.updateProfileImage
);
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
