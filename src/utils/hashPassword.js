import bcrypt from "bcryptjs";

// Desc: Hashes a password using bcryptjs and returns the hashed password.
export const hashPassword = async (password) => {
  // const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
