import bcrypt from "bcryptjs";
export const comparePassword = async (candidatePassword, userPassword) => {
  const isMatch = await bcrypt.compare(candidatePassword, userPassword);
  return isMatch;
};
