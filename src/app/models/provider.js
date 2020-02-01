const mongoose = require("mongoose");
const PointSchema = require("./utils/pointerSchema");

const ProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    fancyName: {
      type: String
    },
    document: {
      type: String,
      unique: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: false
    },
    password: {
      type: String,
      select: false
    },
    location: {
      type: PointSchema,
      index: "2dsphere"
    }
  },
  { timestamps: true }
);

ProviderSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

module.exports = mongoose.model("Provider", ProviderSchema);
