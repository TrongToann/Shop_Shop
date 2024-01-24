"use strict";
const { model, Schema } = require("mongoose");
const slugify = require("slugify");

const COLLECTION_NAME = "Product";
const DOCUMENT_NAME = "Products";

const schema = new Schema(
  {
    name: { type: String, required: true },
    thumb: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    ratingAvarage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating muse be above 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    type: {
      type: String,
      required: true,
      enum: ["Electronic", "Furniture", "Clothing"],
    },
    shop: { type: Schema.Types.ObjectId, required: true, ref: "Shops" },
    attributes: { type: Schema.Types.Mixed, required: true },
    variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
schema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const furnitureSchema = new Schema(
  {
    manufacturer: { type: String, require: true },
    model: { type: String, require: true },
    color: { type: String, require: true },
    shop: { type: Schema.Types.ObjectId, required: true, ref: "Shops" },
  },
  {
    collection: "Furniture",
    timestamps: true,
  }
);
const clothingSchema = new Schema(
  {
    brand: { type: String, require: true },
    size: { type: String, require: true },
    material: { type: String, require: true },
    shop: { type: Schema.Types.ObjectId, required: true, ref: "Shops" },
  },
  {
    collection: "Clothing",
    timestamps: true,
  }
);
const electronicSchema = new Schema(
  {
    brand: { type: String, require: true },
    size: { type: String, require: true },
    material: { type: String, require: true },
    shop: { type: Schema.Types.ObjectId, required: true, ref: "Shops" },
  },
  {
    collection: "Electronic",
    timestamps: true,
  }
);
module.exports = {
  product: model(DOCUMENT_NAME, schema),
  electronic: model("Electronics", electronicSchema),
  clothing: model("Clothings", clothingSchema),
  furniture: model("Furnitures", furnitureSchema),
};
