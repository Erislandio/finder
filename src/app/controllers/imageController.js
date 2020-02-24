const Image = require("../models/image");
const fs = require("fs");

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString("base64");
}

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    try {
      const file = base64_encode(req.file.path);

      const newImage = await Image.create({
        name: req.file.filename,
        email,
        base64: file
      });

      return res.json(newImage);
    } catch (error) {
      return res.json(error);
    }
  },
  async index(req, res) {
    try {
      const { email } = req.body;

      const file = await Image.findOne({ email });

      if (!file) {
        return res.status(400).json({
          error: true,
          message: `User with email: ${email} not exists`
        });
      }

      return res.json(file);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async delete(req, res) {
    try {
      const { email } = req.body;

      Image.findOneAndDelete({ email }).then(() => {
        return res.json({
          deleted: true
        });
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
