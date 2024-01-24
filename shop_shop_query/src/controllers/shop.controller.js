const {
  validateCreateShop,
  validateUpdateShop,
} = require("../utils/validateInput");
const { BadRequestError } = require("../utils/error.handle");
const ShopService = require("../services/shop.service");
const { OK } = require("../utils/succer.handle");
class ShopController {
  static async createShop(req, res, next) {
    const { error } = validateCreateShop(req.body);
    if (error) throw new BadRequestError(error.details[0].message);
    const { name, avatar, description, status } = req.body;
    return new OK({
      message: "Create Shop Successfully!",
      metaData: await ShopService.createShop({
        name,
        avatar,
        description,
        status,
      }),
    }).send(res);
  }
  static async findShop(req, res, next) {
    const { shopId } = req.params;
    return new OK({
      message: "Shop Detail!",
      metaData: await ShopService.findShop({ shopId }),
    }).send(res);
  }
  static async getShops(req, res, next) {
    const { page, limit, sortType } = req.query;
    return new OK({
      message: "List Of Shop!",
      metaData: await ShopService.getShops({ page, limit, sortType }),
    }).send(res);
  }
  static async searchShop(req, res, next) {
    const { text } = req.params;
    return new OK({
      message: "List Of Shop!",
      metaData: await ShopService.searchShop(text),
    }).send(res);
  }
  static async updateShop(req, res, next) {
    const { shopId } = req.params;
    if (!shopId) throw new BadRequestError();
    // const { error } = validateUpdateShop(req.body);
    // if (error) throw new BadRequestError(error.details[0].message);
    return new OK({
      message: "Update Shop Successfully!",
      metaData: await ShopService.updateShop({ shopId, payload: req.body }),
    }).send(res);
  }
  static async removeShop(req, res, next) {
    const { shopId } = req.params;
    if (!shopId) throw new BadRequestError();
    return new OK({
      message: "Remove Shop Successfully!",
      metaData: await ShopService.removeShop({ shopId }),
    }).send(res);
  }
}
module.exports = ShopController;
