"use strict";
const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Account";
const DOCUMENT_NAME = "Accounts";

const schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: Number, default: 2 },
    status: { type: Boolean, default: false },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = model(DOCUMENT_NAME, schema);
