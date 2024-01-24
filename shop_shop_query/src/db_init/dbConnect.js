const mongoose = require("mongoose");
require("dotenv").config();
const connectionString = process.env.MONGO_URL;

class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb") {
    mongoose
      .connect(connectionString)
      .then((_) => console.log("Connect SuccessFully!"))
      .catch((error) => console.log("Connect Errror"));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
  }
}
const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
