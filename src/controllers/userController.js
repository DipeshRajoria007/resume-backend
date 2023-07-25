//userController.js
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { AppTypeEnum } from "../utils/enums.js";
import { filterObj } from "../utils/filterObj.js";
import { getOne } from "./handlerFactory.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

export const getUser = getOne(User);

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user tries to update their password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filter out unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "name",
    "profileImage",
    "address",
    "phone",
    "paymentDetails"
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

//deleteMe
export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isDeleted: true });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined! 😒 Please use /signup instead",
  });
};
export default {
  getAllUsers,
  getUser,
  updateMe,
  deleteMe,
  createUser,
};
