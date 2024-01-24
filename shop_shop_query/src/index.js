const express = require("express");
const app = express();
const router = require("./routers/main.router");
require("./db_init/dbConnect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);

app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Not Found API",
  };
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 400).send({
    error: {
      code: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

module.exports = app;
