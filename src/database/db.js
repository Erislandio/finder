const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb+srv://erislandio:Er1sl@ndio@cluster0-ecwcd.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
