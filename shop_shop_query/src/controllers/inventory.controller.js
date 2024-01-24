const inventoryService = require("../services/inventory.service");
const { BadRequestError } = require("../utils/error.handle");
const { OK } = require("../utils/succer.handle");
class InventoryController {
  static async createInventory(req, res, next) {
    const { productId, shopId, location, stock } = req.body;
    return new OK({
      message: "Create Inventory Successfully!",
      metaData: await inventoryService.createInventory({
        productId,
        shopId,
        location,
        stock,
      }),
    }).send(res);
  }
  static async findInventory(req, res, next) {
    const { productId } = req.params;
    if (!productId) throw new BadRequestError();
    return new OK({
      message: "Inventory Detail!",
      metaData: await inventoryService.findInventoryByProduct({
        productId,
      }),
    }).send(res);
  }
  static async increaseStock(req, res, next) {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (!productId || !quantity) throw new BadRequestError();
    return new OK({
      message: "Increase Inventory Stock Successfully!",
      metaData: await inventoryService.increaseStock({
        productId,
        quantity,
      }),
    }).send(res);
  }
  static async minusStock(req, res, next) {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (!productId || !quantity) throw new BadRequestError();
    return new OK({
      message: "Minus Inventory Stock Successfully!",
      metaData: await inventoryService.minusStock({
        productId,
        quantity,
      }),
    }).send(res);
  }
  static async removeInventory(req, res, next) {
    const { inventoryId } = req.params;
    if (!inventoryId) throw new BadRequestError();
    return new OK({
      message: "Remove Inventory Successfully!",
      metaData: await inventoryService.removeInventory({
        inventoryId,
      }),
    }).send(res);
  }
}
module.exports = InventoryController;
