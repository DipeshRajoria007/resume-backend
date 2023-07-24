// genrateVerifyEmailToken.js
import jwt from "jsonwebtoken";
// Generate token and return it from the function to be used in the login route. This function will be used in the login route.
export const generateVerifyEmailToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// import crypto from "crypto";
// export const generateVerifyEmailToken = () => {
//   // 2) Generate the random reset token
//   const verifyToken = crypto.randomBytes(32).toString("hex");
//   // 3) Encrypt the reset token
//   const hashedVerifyToken = crypto
//     .createHash("sha256")
//     .update(verifyToken)
//     .digest("hex");
//   return hashedVerifyToken;
// };
