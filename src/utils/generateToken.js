import jwt from "jsonwebtoken";
// Generate token and return it from the function to be used in the login route. This function will be used in the login route.
export const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
