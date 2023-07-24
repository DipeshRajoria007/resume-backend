// generateResetPasswordToken.js
import crypto from "crypto";
export const generateResetPasswordToken = () => {
  // 2) Generate the random reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  // 3) Encrypt the reset token
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  return hashedResetToken;
};
