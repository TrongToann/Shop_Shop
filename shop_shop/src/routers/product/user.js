const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../utils/asyncHandler");

router.post("/", asyncHandler(ProductController.createProduct));
router.get("/:productId", asyncHandler(ProductController.findProduct));
router.patch("/:productId", asyncHandler(ProductController.updateProduct));

module.exports = router;
