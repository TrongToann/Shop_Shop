const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const ShopController = require("../../controllers/shop.controller");

router.get("/", asyncHandler(ShopController.getShops));

module.exports = router;
