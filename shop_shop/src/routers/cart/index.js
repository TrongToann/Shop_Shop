const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const CartController = require("../../controllers/cart.controller");

router.get("/:user_id", asyncHandler(CartController.getCart));
router.post("/", asyncHandler(CartController.AddToCart));
router.put("/", asyncHandler(CartController.updateQuantity));
router.put("/minus", asyncHandler(CartController.minusQuantity));
router.put("/increase", asyncHandler(CartController.increaseQuantity));
router.delete("/item", asyncHandler(CartController.removeItem));
router.delete("/", asyncHandler(CartController.removeItems));

module.exports = router;
