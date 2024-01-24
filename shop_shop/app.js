const app = require("./src/index");
require("dotenv").config();
app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT : ${process.env.PORT}`);
});
