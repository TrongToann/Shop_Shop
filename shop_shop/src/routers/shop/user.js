const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const ShopController = require("../../controllers/shop.controller");

router.get("/:shopId", asyncHandler(ShopController.findShop));
router.get("/search/:text", asyncHandler(ShopController.searchShop));
router.post("/", asyncHandler(ShopController.createShop));
router.put("/:shopId", asyncHandler(ShopController.updateShop));

module.exports = router;
