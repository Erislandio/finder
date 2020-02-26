const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("Post", PostSchema);
