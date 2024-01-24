const { OK } = require("../utils/succer.handle");
const UserService = require("../services/user.service");
const { BadRequestError } = require("../utils/error.handle");
const { validateChangePassword } = require("../utils/validateInput");
class UserController {
  static async findUserDetail(req, res, next) {
    const { userId } = req.params;
    if (!userId) throw new BadRequestError();
    return new OK({
      message: "User Detail!",
      metaData: await UserService.findUserDetail({ userId }),
    }).send(res);
  }
  static async findUsers(req, res, next) {
    const { page, limit, sortType } = req.params;
    return new OK({
      message: "List User!",
      metaData: await UserService.findUsers({ page, limit, sortType }),
    }).send(res);
  }
  static async enableDisableUser(req, res, next) {
    const { userId } = req.params;
    return new OK({
      message: "Change User Status!",
      metaData: await UserService.enableDisableUser({ userId }),
    }).send(res);
  }
  static async updateUser(req, res, next) {
    const { userId } = req.params;
    if (!userId) throw new BadRequestError();
    return new OK({
      message: "Update User!",
      metaData: await UserService.updateUser({ payload: req.body, userId }),
    }).send(res);
  }
  static async changePassword(req, res, next) {
    const { userId } = req.params;
    if (!userId) throw new BadRequestError();
    const error = validateChangePassword(req.body);
    if (error) throw new BadRequestError(error.details[0].message);
    const { oldPassword, newPassword, confirmPassword } = req.body;
    return new OK({
      message: "Update User Password Successfully!",
      metaData: await UserService.changePassword({
        userId,
        oldPassword,
        newPassword,
        confirmPassword,
      }),
    }).send(res);
  }
  static async changeUsername(req, res, next) {
    const { userId } = req.params;
    const { username } = req.body;
    if (!userId || !username) throw new BadRequestError();
    return new OK({
      message: "Update User Username Successfully!",
      metaData: await UserService.changeUsername({ userId, username }),
    }).send(res);
  }
}
module.exports = UserController;
