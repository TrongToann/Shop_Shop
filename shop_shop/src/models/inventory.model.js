"use strict";
const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Inventory";
const DOCUMENT_NAME = "Inventories";

const schema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    shop: { type: Schema.Types.ObjectId, ref: "Shop" },
    location: { type: String, default: "unKnow" },
    stock: Array,
    reservations: { type: Array, default: [] },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = model(DOCUMENT_NAME, schema);
