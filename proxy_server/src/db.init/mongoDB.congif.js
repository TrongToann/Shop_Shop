const mongoose = require("mongoose");
require("dotenv").config();
const connectionString = process.env.MONGO_URL;
class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongoose") {
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connect Successfully!"))
      .catch((error) => console.log("Connect Fail!"));
  }
  static getInstance() {
    if (!Database.getInstance) {
      Database.instance = new Database();
    }
  }
}
const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
