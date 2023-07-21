export const sendToken = (user, statusCode, res, token) => {
  const { _id, email, appType } = user;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: { _id, email, appType },
    },
  });
};
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return next(new AppError("Please provide email and password", 400));
//   }
