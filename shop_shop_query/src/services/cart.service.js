const Repository = require("../models/repositories/repository.repo");
const _Cart = require("../models/cart.model");
const mongoose = require("mongoose");
const { NotFoundError } = require("../utils/error.handle");
const { arrayProduct } = require("../utils");
const ProductService = require("../services/product.service");
class CartService {
  static async checkCartExist({ user_id }) {
    const cartCheck = await Repository.checkOne({
      query: { user_id: new mongoose.Types.ObjectId(user_id) },
      MODEL: _Cart,
    });
    if (cartCheck && cartCheck.state !== "active")
      throw new NotFoundError("You Cannot Interact With Cart!");
    return cartCheck;
  }
  static async addToCart({ user_id, product }) {
    const cartCheck = await this.checkCartExist({ user_id });
    const productId = product._id;
    await ProductService.findProduct(productId);
    if (!cartCheck) {
      return await _Cart.create({
        products: [product],
        count_product: 1,
        user_id,
      });
    }
    let newListProduct = [...cartCheck.products, product];
    newListProduct = arrayProduct(newListProduct);
    let query = {
      _id: new mongoose.Types.ObjectId(cartCheck._id),
    };
    let update = {
      products: newListProduct,
      count_product: newListProduct.length,
    };
    return await Repository.update({ query, update, MODEL: _Cart });
  }
  static async removeItem({ user_id, productId }) {
    const cartCheck = await this.checkCartExist({ user_id });
    if (!cartCheck) throw new NotFoundError();
    const newProducts = cartCheck.products.filter(
      (product) => product._id !== productId
    );
    let query = {
      _id: new mongoose.Types.ObjectId(cartCheck._id),
    };
    let update = {
      products: newProducts,
      count_product: newProducts.length,
    };
    return await Repository.update({ query, update, MODEL: _Cart });
  }
  static async removeItems({ user_id, products }) {
    const cartCheck = await this.checkCartExist({ user_id });
    if (!cartCheck) throw new NotFoundError();
    const newProducts = cartCheck.products.filter(
      (product) => !products.includes(product._id)
    );
    let query = {
      _id: new mongoose.Types.ObjectId(cartCheck._id),
    };
    let update = {
      products: newProducts,
      count_product: newProducts.length,
    };
    return await Repository.update({ query, update, MODEL: _Cart });
  }
  static async removeAll({ user_id }) {
    const cartCheck = await this.checkCartExist({ user_id });
    if (!cartCheck) throw new NotFoundError();
    return await Repository.removeOne({ query, MODEL: _Cart });
  }
  static async updateItemQuantity({ user_id, productId, quantity }) {
    const cartCheck = await this.checkCartExist({ user_id });
    if (!cartCheck) throw new NotFoundError();
    let products = cartCheck.products;
    for (var product of products) {
      if (product._id === productId) product.quantity = quantity;
      break;
    }
    let query = {
      _id: new mongoose.Types.ObjectId(cartCheck._id),
    };
    let update = {
      products: products,
      count_product: products.length,
    };
    return await Repository.update({ query, update, MODEL: _Cart });
  }
  static async minusItemQuantity({ user_id, productId }) {
    const cartCheck = await this.checkCartExist({ user_id });
    if (!cartCheck) throw new NotFoundError();
    let products = cartCheck.products;
    for (var product of products) {
      if (product._id === productId) product.quantity -= 1;
      if (product.quantity === 0)
        products = products.filter((p) => p._id !== productId);
      break;
    }
    let query = {
      _id: new mongoose.Types.ObjectId(cartCheck._id),
    };
    let update = {
      products: products,
      count_product: products.length,
    };
    return await Repository.update({ query, update, MODEL: _Cart });
  }
  static async increaseItemQuantity({ user_id, productId }) {
    const cartCheck = await this.checkCartExist({ user_id });
    if (!cartCheck) throw new NotFoundError();
    let products = cartCheck.products;
    for (var product of products) {
      if (product._id === productId) product.quantity += 1;
      break;
    }
    let query = {
      _id: new mongoose.Types.ObjectId(cartCheck._id),
    };
    let update = {
      products: products,
      count_product: products.length,
    };
    return await Repository.update({ query, update, MODEL: _Cart });
  }
  static async getCart({ user_id }) {
    let query = {
      user_id: new mongoose.Types.ObjectId(user_id),
    };
    return await Repository.findOne({ query, MODEL: _Cart });
  }
}
module.exports = CartService;
