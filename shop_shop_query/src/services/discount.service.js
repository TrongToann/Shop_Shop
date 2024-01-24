"use strict";
const Repository = require("../models/repositories/repository.repo");
const _Discount = require("../models/discount.model");
const { default: mongoose } = require("mongoose");
const { parseDateAndTime } = require("../utils/dateHandler");
const { checkMinNumber, checkValidId } = require("../utils/index");
const { BadRequestError } = require("../utils/error.handle");

class DiscountService {
  static async createDiscountCode(payload) {
    if (
      parseDateAndTime(payload.start_date) > parseDateAndTime(payload.end_date)
    )
      throw new BadRequestError("Date Error!");
    if (parseDateAndTime(payload.start_date) > parseDateAndTime(Date.now))
      throw new BadRequestError("Date Error!");
    if (parseDateAndTime(payload.end_date) < parseDateAndTime(Date.now))
      throw new BadRequestError("Date Error!");
    checkMinNumber({ value: payload.max_use, min: 1 });
    checkMinNumber({ value: payload.value, min: 1 });
    checkMinNumber({ value: payload.max_uses_per_user, min: 1 });
    return new _Discount.create({
      name: payload.name,
      description: payload.description,
      type: payload.type,
      value: payload.value,
      code: payload.code,
      start_date: parseDateAndTime(payload.start_date),
      end_date: parseDateAndTime(payload.end_date),
      max_use: payload.max_use,
      max_uses_per_user: payload.max_uses_per_user,
      min_order_value: payload.min_order_value,
      shop: payload.shop,
      is_active: payload.is_active,
      is_system: payload.is_system,
      applies_to: payload.applies_to,
      product_ids: payload.product_id,
    });
  }
  static async getDiscountByShop({ shopId, products, totalOrder }) {
    checkValidId(shopId);
    let query = {
      $or: [
        {
          shop: new mongoose.Types.ObjectId(shopId),
          applies_to: "all",
          min_order_value: { $lte: totalOrder },
          uses_count: { $lt: "$max_use" },
          end_date: { $gt: parseDateAndTime(Date.now) },
          start_date: { $lt: parseDateAndTime(Date.now) },
        },
        {
          applies_to: "specific",
          product_ids: { $all: products },
        },
      ],
    };
    return await Repository.findAll({ query, MODEL: _Discount });
  }
  static async getDiscountById({ discountId }) {
    let query = {
      _id: new mongoose.Types.ObjectId(discountId),
      is_active: true,
    };
    return await Repository.findOne({ query, MODEL: _Discount });
  }
}
module.exports = DiscountService;
