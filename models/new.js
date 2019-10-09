const mongoose = require("mongoose");

const { Schema } = mongoose;

const NewSchema = new Schema({
  createdAt: { type: Date, required: true },
  storyTitle: { type: String, required: false },
  title: { type: String, required: false },
  author: { type: String, required: true },
  objectID: { type: String, required: true },
  storyUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

const model = mongoose.model("New", NewSchema);

module.exports = model;
