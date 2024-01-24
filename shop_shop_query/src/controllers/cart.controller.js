const { BadRequestError } = require("../utils/error.handle");
const { OK } = require("../utils/succer.handle");
const CartService = require("../services/cart.service");
class CartController {
  static async AddToCart(req, res, next) {
    const { user_id, product } = req.body;
    if (!user_id || !product) throw new BadRequestError();
    return new OK({
      message: "Add To Cart Successfully!",
      metaData: await CartService.addToCart({ user_id, product }),
    }).send(res);
  }
  static async updateQuantity(req, res) {
    const { user_id, productId, quantity } = req.body;
    if (!user_id || !productId || !quantity) throw new BadRequestError();
    return new OK({
      message: "Update Cart Quantity Successfully!",
      metaData: await CartService.updateItemQuantity({
        user_id,
        productId,
        quantity,
      }),
    }).send(res);
  }
  static async minusQuantity(req, res) {
    const { user_id, productId } = req.body;
    if (!user_id || !productId) throw new BadRequestError();
    return new OK({
      message: "Minus Cart Quantity Successfully!",
      metaData: await CartService.minusItemQuantity({
        user_id,
        productId,
      }),
    }).send(res);
  }
  static async increaseQuantity(req, res) {
    const { user_id, productId } = req.body;
    if (!user_id || !productId) throw new BadRequestError();
    return new OK({
      message: "Increase Cart Quantity Successfully!",
      metaData: await CartService.increaseItemQuantity({
        user_id,
        productId,
      }),
    }).send(res);
  }
  static async removeItem(req, res) {
    const { user_id, productId } = req.body;
    if (!user_id || !productId) throw new BadRequestError();
    return new OK({
      message: "Remove Cart Item Successfully!",
      metaData: await CartService.removeItem({
        user_id,
        productId,
      }),
    }).send(res);
  }
  static async removeItems(req, res) {
    const { user_id, products } = req.body;
    if (!user_id || !products) throw new BadRequestError();
    return new OK({
      message: "Remove Cart Item Successfully!",
      metaData: await CartService.removeItems({
        user_id,
        products,
      }),
    }).send(res);
  }
  static async getCart(req, res) {
    const { user_id } = req.params;
    if (!user_id) throw new BadRequestError();
    return new OK({
      message: "Cart Information!",
      metaData: await CartService.getCart({ user_id }),
    }).send(res);
  }
}
module.exports = CartController;
