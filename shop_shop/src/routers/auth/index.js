const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const { verifyTokenCookie } = require("../../auth/verifyToken");
const AuthController = require("../../controllers/auth.controller");

router.post("/register", asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));
router.post("/logout", verifyTokenCookie, asyncHandler(AuthController.logout));

module.exports = router;
