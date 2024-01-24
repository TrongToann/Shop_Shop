const {
  InternalServerError,
  BadRequestError,
} = require("../utils/error.handle");
const Repository = require("../models/repositories/repository.repo");
const _Shop = require("../models/shop.model");
const {
  checkValidId,
  removeInsideUndefineObject,
  removeUndefineObject,
} = require("../utils/index");
const mongoose = require("mongoose");

const sortPhase = new Map([
  ["name_desc", { name: 1 }],
  ["name_asc", { name: -1 }],
  ["default", "ctime"],
]);
const returnSortPhase = (code) => {
  return sortPhase.get(code) || sortPhase.get("default");
};

class ShopService {
  static async createShop({ name, avatar, description, status = false }) {
    let query = { name };
    const checkExistShop = await Repository.checkOne({ query, MODEL: _Shop });
    if (checkExistShop) throw new BadRequestError("Shop Name is already exist");
    const shop = await _Shop.create({
      name,
      avatar,
      description,
      status,
    });
    if (!shop) throw new InternalServerError();
    return shop;
  }
  static async findShop({ shopId }) {
    checkValidId(shopId);
    let query = {
      _id: new mongoose.Types.ObjectId(shopId),
      status: true,
    };
    return await Repository.findOne({ query, MODEL: _Shop });
  }
  static async getShops({ page = 1, limit = 12, sortType = "default" }) {
    const sort = returnSortPhase(sortType);
    return await Repository.findAll({ page, limit, sort, MODEL: _Shop });
  }
  static async searchShop(text) {
    let options = { status: true };
    let filter = ["name", "avatar", "description"];
    return Repository.searchByText({
      keySearch: text,
      MODEL: _Shop,
      filter,
      options,
    });
  }
  static async updateShop({ shopId, payload }) {
    checkValidId(shopId);
    let query = {
      _id: new mongoose.Types.ObjectId(shopId),
      status: true,
    };
    const objectParams = removeUndefineObject(payload);
    return await Repository.update({
      query,
      update: removeInsideUndefineObject(objectParams),
      MODEL: _Shop,
    });
  }
  static async removeShop({ shopId }) {
    checkValidId(shopId);
    let query = {
      _id: new mongoose.Types.ObjectId(shopId),
      status: true,
    };
    let update = {
      status: false,
    };
    return await Repository.update({ query, update, MODEL: _Shop });
  }
}
module.exports = ShopService;
