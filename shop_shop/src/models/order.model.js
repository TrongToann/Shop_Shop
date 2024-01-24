"use strict";
const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Order";
const DOCUMENT_NAME = "Orders";

const schema = new Schema(
  {
    user_id: { type: String, require: true, ref: "Accounts" },
    checkout: { type: Array },
    payment: {
      type: String,
      enum: ["Online Payment", "COD"],
      default: "Online Payment",
    },
    totalPrice: { type: Number, require: true },
    status: { type: Boolean, default: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = model(DOCUMENT_NAME, schema);
