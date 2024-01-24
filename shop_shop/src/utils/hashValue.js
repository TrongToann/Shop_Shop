const bcrypt = require("bcrypt");
const { InternalServerError } = require("./error.handle");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashOtp = await bcrypt.hash(password, salt);
    return hashOtp;
  } catch (error) {
    throw new InternalServerError("Server Error With Hashed");
  }
};

const comparePassword = async ({ password, hashpassword }) => {
  try {
    const isValid = await bcrypt.compare(password, hashpassword);
    return isValid;
  } catch (error) {
    throw new InternalServerError("Server Error With Hashed");
  }
};
module.exports = {
  hashPassword,
  comparePassword,
};
