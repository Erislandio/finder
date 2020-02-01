const mongoose = require("mongoose");
const PointSchema = require("./utils/pointerSchema");
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  document: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  location: {
    type: PointSchema,
    index: "2dsphere"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

module.exports = mongoose.model("User", UserSchema);
