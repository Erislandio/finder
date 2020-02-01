const mongoose = require("mongoose");

module.exports = mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://erislandio:Er1sl@ndio@cluster0-ecwcd.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
