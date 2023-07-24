import bcrypt from "bcryptjs";
export const comparePassword = async (plainText, userPassword) => {
  console.log("comparePassword");
  const newHash = await bcrypt.hash(plainText, 10);
  console.log(newHash);
  const isMatch = await bcrypt.compare(plainText, newHash);
  return isMatch;
};
