"use strict";
const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Cart";
const DOCUMENT_NAME = "Carts";

const schema = new Schema(
  {
    state: {
      type: String,
      required: true,
      enum: ["active", "blocked", "pending"],
      default: "active",
    },
    products: { type: Array, required: true, default: [] },
    count_product: { type: Number, default: 0 },
    user_id: { type: String, required: true, ref: "Accounts" },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = model(DOCUMENT_NAME, schema);
