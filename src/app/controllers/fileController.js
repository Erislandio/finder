const File = require("../models/file");

module.exports = {
  async index(req, res) {
    const files = await File.find();

    return res.json(files);
  },
  async store(req, res) {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const file = await File.create({
      name,
      size,
      key,
      url
    });

    return res.json(file);
  }
};
