import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { AppTypeEnum } from "../utils/enums.js";
import { generateToken } from "../utils/generateToken.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateRandomToken } from "../utils/generateRandomToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/comparePassword.js";
import { generateResetPasswordToken } from "../utils/generateResetPasswordToken.js";
import { generateResetPasswordTemplate } from "../utils/generateResetPasswordTemplate.js";
import { generateVerifyEmailTemplate } from "../utils/generateVerifyEmailTemplate.js";
import { generateVerifyEmailToken } from "../utils/generateVerifyEmailToken.js";

export const signup = catchAsync(async (req, res, next) => {
  const { email, password, appType } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    email,
    password: hashedPassword,
    appType,
  });
  const token = generateToken(user._id);
  sendToken(user, 201, res, token);
});

// export const login = catchAsync(async (req, res, next) => {
