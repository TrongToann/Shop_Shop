const JWT = require("jsonwebtoken");
require("dotenv").config();
const {
  UnAuthorizedError,
  ForBiddienError,
  NotFoundError,
} = require("../utils/error.handle");
const keyTokenService = require("../services/token.service");
const { createToken } = require("../utils/keyHandler");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  REFRESHTOKEN: "x-client-refreshtoken",
  ACCESSTOKEN: "x-client-accesstoken",
};
const verifyTokenCookie = async (req, res, next) => {
  try {
    const accessToken = req.headers[HEADER.ACCESSTOKEN];
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    const user = req.headers[HEADER.CLIENT_ID];
    if (!accessToken || !refreshToken || !user) throw new UnAuthorizedError();
    const keyToken = await keyTokenService.findTokenByUserId({
      user,
      refreshToken,
    });
    if (!keyToken) throw new ForBiddienError();

    const verifyAccessToken = await verifyToken(
      accessToken,
      keyToken.publicKey
    );

    if (!verifyAccessToken) {
      const verifyRefreshToken = await verifyToken(
        refreshToken,
        keyToken.publicKey
      );
      if (!verifyRefreshToken) {
        throw new UnAuthorizedError();
        // return res.status(403).json({
        //   message: "UnAuthenticated",
        // });
      }
      const token = await createToken({
        email: verifyRefreshToken.email,
        _id: verifyRefreshToken._id,
      });
      req.payload = verifyRefreshToken;
      req.accessToken = token.accessToken;
      req.refreshToken = token.refreshToken;
      next();
    }
    if (user !== verifyAccessToken._id) {
      throw new UnAuthorizedError();
      //   return res.status(403).json({
      //     message: "UnAuthorized",
      //   });
    }
    req.payload = verifyAccessToken;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = (token, publicKey) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, publicKey, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

module.exports = {
  verifyTokenCookie,
};
