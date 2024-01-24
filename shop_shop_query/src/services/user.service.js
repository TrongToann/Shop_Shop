const mongoose = require("mongoose");
const UserRepository = require("../models/repositories/user.repo");
const {
  checkValidId,
  removeInsideUndefineObject,
  removeUndefineObject,
} = require("../utils/index");
const { comparePassword, hashPassword } = require("../utils/hashValue");
const { BadRequestError } = require("../utils/error.handle");
const sortPhase = new Map([
  ["name_desc", { name: 1 }],
  ["name_asc", { name: -1 }],
  ["default", "ctime"],
]);
const returnSortPhase = (code) => {
  return sortPhase.get(code) || sortPhase.get("default");
};
class UserService {
  static async findUserDetail({ userId }) {
    checkValidId(userId);
    let query = { _id: new mongoose.Types.ObjectId(userId) };
    let filter = ["__v", "password", "status"];
    return await UserRepository.findOneWithUnselected({ query, filter });
  }
  static async findUsers({ page = 1, limit = 12, sortType = "default" }) {
    const sort = returnSortPhase(sortType);
    const filter = ["username", "fullName", "role", "status"];
    return await UserRepository.findAll({ page, filter, limit, sort });
  }
  static async updateUser({ payload, userId }) {
    checkValidId(userId);
    const objectParam = removeUndefineObject(payload);
    let query = { _id: new mongoose.Types.ObjectId(userId), status: true };
    let bodyUpdate = removeInsideUndefineObject(objectParam);
    return await UserRepository.updateUserById({ query, payload: bodyUpdate });
  }
  static async changePassword({
    userId,
    oldPassword,
    newPassword,
    confirmPassword,
  }) {
    checkValidId(userId);
    let query = {
      _id: new mongoose.Types.ObjectId(userId),
      status: true,
    };
    const userCheck = await UserRepository.findOne({ query });
    const isValid = await comparePassword({
      password: oldPassword,
      hashpassword: userCheck.password,
    });
    if (!isValid) throw new BadRequestError("Invalid Password!");
    if (newPassword !== confirmPassword)
      throw new BadRequestError("Password Is Conflict!");
    let payload = {
      password: await hashPassword(newPassword),
    };
    return await UserRepository.updateUserById({ query, payload });
  }
  static async changeUsername({ userId, username }) {
    checkValidId(userId);
    let query = {
      _id: new mongoose.Types.ObjectId(userId),
      username,
      status: true,
    };
    const userCheck = await _User.findOne(query);
    if (userCheck) throw new BadRequestError("Username is already in use!");
    let payload = {
      username,
    };
    return await UserRepository.updateUserById({ query, payload });
  }
  static async enableDisableUser({ userId }) {
    checkValidId(userId);
    let query = { _id: new mongoose.Types.ObjectId(userId) };
    return await UserRepository.enableDisAble({ query });
  }
}
module.exports = UserService;
