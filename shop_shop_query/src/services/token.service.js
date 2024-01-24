const { default: mongoose } = require("mongoose");
const _KeyToken = require("../models/token.model");
const Repository = require("../models/repositories/repository.repo");
const {
  ConflictRequestError,
  InternalServerError,
} = require("../utils/error.handle");
const { checkValidId } = require("../utils");
class keyTokenService {
  static async createTokenKey({ user, publicKey, refreshToken }) {
    checkValidId(user);
    let tokenKey;
    let query = { user };
    const tokenCheck = await _KeyToken.findOne(query);
    if (!tokenCheck) {
      tokenKey = await _KeyToken.create({
        user,
        publicKey: publicKey.toString(),
        refreshToken,
        refreshTokenUsed: [],
      });
      if (!tokenKey) throw new InternalServerError();
      return tokenKey;
    }
    tokenKey = await _KeyToken.findOneAndUpdate(query, {
      $set: {
        publicKey,
        refreshToken,
      },
      $push: {
        refreshTokenUsed: tokenCheck.refreshToken,
      },
    });
    if (!tokenKey) throw new InternalServerError();
    return tokenKey;
  }
  static async findTokenByUserId({ user, refreshToken }) {
    checkValidId(user);
    const tokenByUser = await _KeyToken.findOne({
      user: new mongoose.Types.ObjectId(user),
    });
    if (!tokenByUser) return null;
    const checkUsed = tokenByUser.refreshTokenUsed.some(
      (used) => used === refreshToken
    );
    if (checkUsed) throw new ConflictRequestError();
    return tokenByUser;
  }
  static async deleteTokenUser({ user }) {
    checkValidId(user);
    return _KeyToken.deleteOne({
      user: new mongoose.Types.ObjectId(user),
    });
  }
}
module.exports = keyTokenService;
