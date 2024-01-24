const _User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hashValue");
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} = require("../utils/error.handle");
const { createToken } = require("../utils/keyHandler");
const { checkValidId } = require("../utils");
const mongoose = require("mongoose");
const tokenService = require("../services/token.service");

class AuthService {
  static async register({
    username,
    password,
    confirmPassword,
    fullName,
    role = 2,
    status = false,
  }) {
    const userCheck = await _User.findOne({ username });
    if (userCheck) throw new BadRequestError("Username already exists!");
    if (password !== confirmPassword)
      throw new BadRequestError("Password Faild!");
    const passwordHassing = await hashPassword(password);
    if (!passwordHassing) throw new NotFoundError();
    const user = await _User.create({
      username,
      password: passwordHassing,
      fullName,
      role,
      status,
    });
    if (!user) throw new InternalServerError();
    return user;
  }
  static async login({ username, password }) {
    const userCheck = await _User.findOne({ username, status: true });
    if (!userCheck) throw new NotFoundError("Cannot Login To System!");
    const isValid = await comparePassword({
      password,
      hashpassword: userCheck.password,
    });
    if (!isValid) throw new NotFoundError("Cannot Login To System!");
    const token = await createToken({ username, _id: userCheck._id });
    return token;
  }
  static async logout({ userId }) {
    await tokenService.deleteTokenUser({ user: userId });
    //Redis
  }
}
module.exports = AuthService;
