const crypto = require("crypto");
const { NotFoundError } = require("../utils/error.handle");
const keyTokenService = require("../services/token.service");
const { generateToken } = require("../auth/generateToken");

const createToken = async (payload) => {
  const { privateKey, publicKey } = await crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
  const token = await generateToken({ privateKey, payload });
  if (!token.accessToken || !token.refreshToken) {
    throw new NotFoundError("Cannot Login To System");
  }
  await keyTokenService.createTokenKey({
    user: payload._id,
    publicKey,
    refreshToken: token.refreshToken,
  });
  return token;
};
module.exports = {
  createToken,
};
