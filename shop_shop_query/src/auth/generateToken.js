const JWT = require("jsonwebtoken");
const { InternalServerError } = require("../utils/error.handle");

const generateToken = async ({ privateKey, payload }) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "60d",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "120d",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new InternalServerError();
  }
};
module.exports = {
  generateToken,
};
