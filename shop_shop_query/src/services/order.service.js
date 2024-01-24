const { default: mongoose } = require("mongoose");
const _Order = require("../models/order.model");
const Repository = require("../models/repositories/repository.repo");
const { checkMinNumber, checkProductsExist } = require("../utils/index");
const { BadRequestError } = require("../utils/error.handle");
const sortPhase = new Map([
  ["price_desc", { totalPrice: 1 }],
  ["price_asc", { totalPrice: -1 }],
  ["day_desc", { createAt: 1 }],
  ["day_asc", { createAt: -1 }],
  ["default", "ctime"],
]);
const returnSortPhase = (code) => {
  return sortPhase.get(code) || sortPhase.get("default");
};

class OrderService {
  static async createOrder({ user_id, checkout, payment, totalPrice }) {
    let checkNumber = true;
    checkMinNumber({ value: totalPrice, min: 0 });
    const productsCheckout = await checkProductsExist(checkout);
    productsCheckout.map((product, index) => {
      const productInsideCheckout = checkout[index];
      if (product.quantity < 100) checkNumber = false;
      if (product.price !== productInsideCheckout.price || !product.isPublished)
        throw new BadRequestError(
          `${checkout.name}'s information has been change!`
        );
    });
    return await _Order.create({
      user_id,
      checkout,
      payment,
      totalPrice,
    });
  }
  static async findOrder({ orderId }) {
    let query = {
      _id: new mongoose.Types.ObjectId(orderId),
      status: true,
    };
    return await Repository.findOne({ query, MODEL: _Order });
  }
  static async getOrders({ limit = 12, page = 1, sortType = "default" }) {
    const sort = returnSortPhase(sortType);
    return await Repository.findAll({ limit, page, sort, MODEL: _Order });
  }
  static async getOrdersByUser({
    user_id,
    limit = 12,
    page = 1,
    sortType = "default",
  }) {
    const sort = returnSortPhase(sortType);
    let query = {
      user_id: new mongoose.Types.ObjectId(user_id),
      status: true,
    };
    return await Repository.findAll({
      page,
      sort,
      limit,
      query,
      MODEL: _Order,
    });
  }
  static async getOrdersByType({
    limit = 12,
    page = 1,
    sortType = "default",
    paymentType,
  }) {
    const sort = returnSortPhase(sortType);
    let query = {
      payment: paymentType,
    };
    return await Repository.findAll({
      query,
      limit,
      page,
      sort,
      MODEL: _Order,
    });
  }
}
module.exports = OrderService;
