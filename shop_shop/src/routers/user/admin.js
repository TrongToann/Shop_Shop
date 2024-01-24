const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../utils/asyncHandler");
const UserController = require("../../controllers/user.controller");

router.get("/", asyncHandler(UserController.findUsers));
router.put("/", asyncHandler(UserController.updateUser));
router.delete("/", asyncHandler(UserController.enableDisableUser));

module.exports = router;
