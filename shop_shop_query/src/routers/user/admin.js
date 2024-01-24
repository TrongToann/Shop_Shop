const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const UserController = require("../../controllers/user.controller");

router.get("/", asyncHandler(UserController.findUsers));

module.exports = router;
