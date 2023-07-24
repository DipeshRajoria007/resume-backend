import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { AppTypeEnum } from "../utils/enums.js";
import { generateToken } from "../utils/generateToken.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
// import { generateRandomToken } from "../utils/generateRandomToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/comparePassword.js";
// import { generateResetPasswordToken } from "../utils/generateResetPasswordToken.js";
import { generateResetPasswordTemplate } from "../utils/generateResetPasswordTemplate.js";
// import { generateVerifyEmailTemplate } from "../utils/generateVerifyEmailTemplate.js";
// import { generateVerifyEmailToken } from "../utils/generateVerifyEmailToken.js";

export const signup = catchAsync(async (req, res, next) => {
  console.log("signup");
  const { name, email, password } = req.body;
  // check if user exists in db already with email address provided in req.body return response with user already exists
  let user = await User.findOne({ email });
  console.log(user);
  if (user) {
    return res.status(403).json({
      status: "fail",
      message: "User already exists",
    });
  }
  // create new user
  const hashedPassword = await hashPassword(password);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = generateToken(user._id);
  sendToken(user, 201, res, token);
});
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password exsist
  if (!email || !password)
    return next(new AppError("please provide email and password", 400));
  // check if user exits and passord is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password)))
    return next(new AppError("Incorrect EmailId or Password", 401));

  const token = generateToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
export const forgotPassword = catchAsync(async (req, res, next) => {
  //  1) Get user based on POSTed email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordRandomToken();
  await user.save({ validateBeforeSave: false });
  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;

  const message = `click on this link ${resetURL} to reset your password`;

  // const message = generateResetPasswordTemplate(resetURL);
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // This could be a middleware function in your user schema

  // 4) Log the user in, send JWT
  const token = generateToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.comparePassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  await user.save();

  // 4) Log user in, send JWT
  const token = generateToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

export default {
  signup,
  login,
  forgotPassword,
  updatePassword,
};
