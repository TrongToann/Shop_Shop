function router(app) {
  app.use("/shop", require("./shop/index"));
  app.use("/product", require("./product/index"));
  app.use("/user", require("../routers/user/index"));
  app.use("/inventory", require("../routers/inventory/index"));
  app.use("/cart", require("../routers/cart/index"));
}
module.exports = router;
