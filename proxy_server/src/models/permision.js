"use strict";
const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "ApiKey";
const DOCUMENT_NAME = "ApiKeys";

const schema = new Schema(
  {
    key: { type: String, required: true },
    version: { type: String, required: true },
    description: { type: String, default: "" },
    permissions: { type: Array, default: ["1001", "1002"] },
    status: { type: Boolean, default: false },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = model(DOCUMENT_NAME, schema);
