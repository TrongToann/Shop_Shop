const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const InventoryController = require("../../controllers/inventory.controller");

router.post("/", asyncHandler(InventoryController.createInventory));
router.delete(
  "/:inventoryId",
  asyncHandler(InventoryController.removeInventory)
);

module.exports = router;
