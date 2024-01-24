const AuthService = require("../services/auth.service");
const { BadRequestError } = require("../utils/error.handle");
const { validateRegister } = require("../utils/validateInput");
const { OK } = require("../utils/succer.handle");
class AuthController {
  static async register(req, res, next) {
    const error = validateRegister(req.body);
    if (error) throw new BadRequestError(error.details[0].message);
    const { username, password, confirmPassword, fullName, role, status } =
      req.body;
    return new OK({
      message: "Register User Successfully!",
      metaData: await AuthService.register({
        username,
        password,
        confirmPassword,
        fullName,
        role,
        status,
      }),
    }).send(res);
  }
  static async login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) throw new BadRequestError();
    return new OK({
      message: "Login User Successfully!",
      metaData: await AuthService.login({ username, password }),
    }).send(res);
  }
  static async logout(req, res, next) {
    const { _id } = req.payload;
    return new OK({
      message: "Logout Successfully!",
      metaData: await AuthService.logout({ userId: _id }),
    }).send(res);
  }
}
module.exports = AuthController;
