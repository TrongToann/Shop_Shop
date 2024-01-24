const joi = require("joi");
const validateCreateShop = (data) => {
  const validateSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    avatar: joi.string().required(),
    description: joi.string(),
    status: joi.bool(),
  });
  return validateSchema.validate(data);
};
const validateUpdateShop = (data) => {
  const validateSchema = joi.object({
    name: joi.string().min(3).max(50),
    avatar: joi.string().empty(),
    description: joi.string().empty(),
  });
  return validateSchema.validate(data);
};
const validateChangePassword = (data) => {
  const validateSchema = joi.object({
    oldPassword: joi
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required(),
    newPassword: joi
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required(),
    confirmPassword: joi
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required(),
  });
  return validateSchema.validate(data);
};
const validateRegister = (data) => {
  const validateSchema = joi.object({
    username: joi.string().required().min(3).max(30),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    fullName: joi.string().required().min(3).max(50),
    role: joi.number(),
    status: joi.bool(),
  });
  validateSchema.validate(data);
};
const validateCreateInventory = (data) => {
  const validateSchema = joi.object({
    productId: joi.string().required(),
    shopId: joi.string().required(),
    location: joi.string().required(),
    stock: joi.number().min(1).required(),
  });
  return validateSchema.validate(data);
};
const validateCreateOrder = (data) => {
  const validateSchema = joi.object({
    checkout: joi.array().required(),
    payment: joi.string().required(),
    totalPrice: joi.number().required().min(0),
  });
  return validateSchema.validate(data);
};
module.exports = {
  validateCreateShop,
  validateUpdateShop,
  validateChangePassword,
  validateRegister,
  validateCreateInventory,
  validateCreateOrder,
};
