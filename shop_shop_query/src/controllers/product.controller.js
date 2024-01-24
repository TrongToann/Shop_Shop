const ProductFactory = require("../services/product.service");
const { BadRequestError } = require("../utils/error.handle");
const { OK } = require("../utils/succer.handle");
class ProductController {
  static async createProduct(req, res, next) {
    const payload = req.body;
    const type = payload.type;
    return new OK({
      message: "Create Product Successfully!",
      metaData: await ProductFactory.createProduct(type, payload),
    }).send(res);
  }
  static async updateProduct(req, res, next) {
    const { productId } = req.params;
    const payload = req.body;
    const type = payload.type;
    if (!productId || !payload || !type) throw new BadRequestError();
    return new OK({
      message: "Update Product Successfully!",
      metaData: await ProductFactory.updateProduct(type, productId, payload),
    }).send(res);
  }
  static async findProduct(req, res, next) {
    const { productId } = req.params;
    if (!productId) throw new BadRequestError();
    return new OK({
      message: "Product Detail!",
      metaData: await ProductFactory.findProduct(productId),
    }).send(res);
  }
}
module.exports = ProductController;
