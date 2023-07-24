//userController.js
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { AppTypeEnum } from "../utils/enums.js";
import { filterObj } from "../utils/filterObj.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  //getUser
});
// updateUser
// export const

export const updateMe = catchAsync(async (req, res, next) => {
  //complete updateme
});
//deleteMe
export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

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
