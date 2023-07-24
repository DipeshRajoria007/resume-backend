// Function to send token to client and set it as a cookie. This function will be used in the login and signup routes.
export const sendToken = (user, statusCode, res, token) => {
  const { _id, email } = user;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: { _id, email },
    },
  });
};
