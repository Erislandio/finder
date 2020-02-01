const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const FileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FileSchema.pre("save", function() {
  if (!this.url) {
    this.url = `/files/${this.key}`;
  }
});

FileSchema.pre("remove", function() {
  return promisify(fs.unlink)(
    path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
  );
});

module.exports = mongoose.model("File", FileSchema);
