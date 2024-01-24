const OrderService = require("../services/order.service");
const { OK } = require("../utils/succer.handle");
const { BadRequestError } = require("../utils/error.handle");
const { validateCreateOrder } = require("../utils/validateInput");

class OrderController {
  static async createOrder(req, res) {
    const { error } = validateCreateOrder(req.body);
    if (error) throw new BadRequestError(error.details[0].message);
    return await OK({
      message: "Create Order Successfully!",
      metaData: await OrderService.createOrder({
        user_id,
        checkout,
        payment,
        totalPrice,
      }),
    }).send(res);
  }
}
module.exports = OrderController;
