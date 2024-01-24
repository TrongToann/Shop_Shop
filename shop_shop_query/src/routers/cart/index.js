const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const CartController = require("../../controllers/cart.controller");

router.get("/:user_id", asyncHandler(CartController.getCart));

module.exports = router;
