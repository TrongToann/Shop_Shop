const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const ShopController = require("../../controllers/shop.controller");

router.get("/", asyncHandler(ShopController.getShops));
router.delete("/:shopId", asyncHandler(ShopController.removeShop));

module.exports = router;
