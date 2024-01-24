"use strict";

const {
  product,
  clothing,
  electronic,
  furniture,
} = require("../models/product.model");
const {
  BadRequestError,
  InternalServerError,
} = require("../utils/error.handle");
const ProductRepository = require("../models/repositories/product.rep");
const Repository = require("../models/repositories/repository.repo");
const {
  removeUndefineObject,
  removeInsideUndefineObject,
  checkValidId,
} = require("../utils");
const { default: mongoose } = require("mongoose");

class ProductFactory {
  static productRegistry = {};

  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new BadRequestError("Invalid Type Product");
    return new productClass(payload).createProduct();
  }
  static async updateProduct(type, productId, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new BadRequestError("Invalid Type Product");
    return new productClass(payload).updateProduct(productId);
  }
  static async findProduct(productId) {
    checkValidId(productId);
    let query = {
      _id: new mongoose.Types.ObjectId(productId),
    };
    return await Repository.findOne({ query, MODEL: product });
  }
  static async getProductByShop(shopId) {
    checkValidId(shopId);
    let query = {
      shop: new mongoose.Types.ObjectId(shopId),
      status: true,
    };
    return await Repository.findAll({ query, MODEL: product });
  }
}

class Product {
  constructor({
    name,
    thumb,
    description,
    price,
    type,
    shop,
    attributes,
    quantity,
    isDraft,
    isPublished,
  }) {
    this.name = name;
    this.thumb = thumb;
    this.description = description;
    this.price = price;
    this.type = type;
    this.shop = shop;
    this.attributes = attributes;
    this.quantity = quantity;
    this.isDraft = isDraft;
    this.isPublished = isPublished;
  }

  async createProduct(productId) {
    const newProduct = await product.create({
      ...this,
      _id: productId,
    });
    if (!newProduct) throw new InternalServerError();
    return newProduct;
  }
  async updateProduct(productId, payload) {
    let query = {
      _id: new mongoose.Types.ObjectId(productId),
    };
    return await Repository.update({
      query,
      update: payload,
      MODEL: product,
    });
  }
}
class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.attributes,
      shop: this.shop,
    });
    if (!newClothing) throw new BadRequestError("Create Clothing Error!");
    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError("Create Clothing Error!");
    return newProduct;
  }
  async updateProduct(productId) {
    let objectParams = removeUndefineObject(this);
    let query = {
      _id: new mongoose.Types.ObjectId(productId),
    };
    if (objectParams.attributes) {
      await Repository.update({
        query,
        update: removeUndefineObject(objectParams.attributes),
        MODEL: clothing,
      });
    }

    const updateProduct = await super.updateProduct(
      productId,
      removeInsideUndefineObject(objectParams)
    );
    return updateProduct;
  }
  async findProduct(productId) {}
}
class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.attributes,
      shop: this.shop,
    });
    if (!newElectronic) throw new BadRequestError("Create Electronic Error!");
    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError("Create Electronic Error!");
    return newProduct;
  }
}
class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.attributes,
      shop: this.shop,
    });
    if (!newFurniture) throw new BadRequestError("Create Furniture Error!");
    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) throw new BadRequestError("Create Furniture Error!");
    return newProduct;
  }
}
//register product type
ProductFactory.registerProductType("Electronic", Electronic);
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Furniture", Furniture);
ProductFactory.registerProductType("Product", Product);

module.exports = ProductFactory;
