const { NotFoundError } = require("../../utils/error.handle");

class ProductRepository {
  static async updateProductById({ productId, payload, model, isNew = true }) {
    const result = await model.findByIdAndUpdate(productId, payload, {
      new: isNew,
    });
    if (!result) throw new NotFoundError();
    return result;
  }
}
module.exports = ProductRepository;
