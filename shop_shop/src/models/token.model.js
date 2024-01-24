"use strict";
const { model, Schema } = require("mongoose");

const COLLECTION_NAME = "Token";
const DOCUMENT_NAME = "Tokens";

const schema = new Schema(
  {
    user: { type: String, require: true, ref: "Accounts" },
    publicKey: { type: String, require: true },
    refreshToken: { type: String, require: true },
    refreshTokenUsed: { type: Array },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = model(DOCUMENT_NAME, schema);
