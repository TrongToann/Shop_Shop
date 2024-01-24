const {
  InternalServerError,
  BadRequestError,
} = require("../utils/error.handle");
const Repository = require("../models/repositories/repository.repo");
const _Inventory = require("../models/inventory.model");
const productService = require("../services/product.service");
const shopService = require("../services/shop.service");
const { checkValidId, checkMinNumber } = require("../utils/index");
const { default: mongoose } = require("mongoose");
class InventoryService {
  static async createInventory({ productId, shopId, location, stock }) {
    checkValidId(productId);
    checkValidId(shopId);
    checkMinNumber({ value: stock, min: 0 });
    await productService.findProduct(productId);
    await shopService.findShop({ shopId });
    const productOfShop = await productService.getProductByShop(shopId);
    if (!productOfShop.some((product) => product._id === productId))
      throw new BadRequestError("Product Is Invalid In Shop");
    const checkProductInventory = await Repository.checkOne({
      query: { _id: new mongoose.Types.ObjectId(productId) },
      MODEL: _Inventory,
    });
    if (checkProductInventory)
      throw new BadRequestError("Product Already Have An Inventory!");
    const inventory = await _Inventory.create({
      productId,
      shopId,
      location,
      stock,
    });
    if (!inventory) throw new InternalServerError();
    return inventory;
  }
  static async findInventoryByProduct({ productId }) {
    checkValidId(productId);
    let query = {
      productId: new mongoose.Types.ObjectId(productId),
    };
    return await Repository.findOne({ query, MODEL: _Inventory });
  }
  static async increaseStock({ productId, quantity }) {
    checkMinNumber({ value: quantity, min: 0 });
    checkValidId(productId);
    let query = {
      productId: new mongoose.Types.ObjectId(productId),
    };
    let update = {
      $inc: {
        stock: +quantity,
      },
    };
    return await Repository.update({ query, update, MODEL: _Inventory });
  }
  static async minusStock({ productId, quantity }) {
    checkMinNumber({ value: quantity, min: 0 });
    checkValidId(productId);
    let query = {
      productId: new mongoose.Types.ObjectId(productId),
    };
    let update = {
      $inc: {
        stock: -quantity,
      },
    };
    return await Repository.update({ query, update, MODEL: _Inventory });
  }
  static async removeInventory({ inventoryId }) {
    checkValidId(inventoryId);
    let query = {
      _id: new mongoose.Types.ObjectId(inventoryId),
    };
    return await _Inventory.deleteOne(query);
  }
}
module.exports = InventoryService;
