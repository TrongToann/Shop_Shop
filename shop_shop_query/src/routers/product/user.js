const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../utils/asyncHandler");

router.get("/:productId", asyncHandler(ProductController.findProduct));

module.exports = router;
