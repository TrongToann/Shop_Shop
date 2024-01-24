const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const ShopController = require("../../controllers/shop.controller");

router.get("/:shopId", asyncHandler(ShopController.findShop));
router.get("/search/:text", asyncHandler(ShopController.searchShop));

module.exports = router;
