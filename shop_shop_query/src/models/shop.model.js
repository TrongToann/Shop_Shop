"use strict";
const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Shop";
const DOCUMENT_NAME = "Shops";

const schema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: Boolean, default: false },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
schema.index({ name: "text" });
module.exports = model(DOCUMENT_NAME, schema);
