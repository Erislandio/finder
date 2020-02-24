const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true
  },
  base64: {
    type: String
  }
});

module.exports = mongoose.model("Image", ImageSchema);
