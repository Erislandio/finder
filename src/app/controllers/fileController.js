const cloudinary = require("cloudinary").v2;
const File = require("../models/file");
const User = require("../models/user");

cloudinary.config({
  cloud_name: "acct",
  api_key: "444224854531139",
  api_secret: "YoJz67Kg17g4qJXRwqNwAEyUipU"
});

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
  },
  async storeCloudinary(req, res) {
    const { file } = req;
    const { email } = req.body;

    try {
      cloudinary.uploader
        .upload(file.path, { tags: "file" })
        .then(async image => {
          const updated = await File.findOne({ email });

          if (updated) {
            const { public_id } = updated;

            return cloudinary.uploader
              .destroy(public_id)
              .then(() => {
                File.findOneAndDelete({ email }).then(async data => {
                  const newFile = await File.create({
                    name: image.original_filename,
                    size: image.bytes,
                    key: image.signature,
                    url: image.url,
                    email: email,
                    public_id: image.public_id
                  });

                  return res.json({
                    newFile,
                    updated: true
                  });
                });
              })
              .catch(err => {
                return res.json({
                  error: true,
                  message: "updated error",
                  err
                });
              });
          }

          const newFile = await File.create({
            name: image.original_filename,
            size: image.bytes,
            key: image.signature,
            url: image.url,
            email: email,
            public_id: image.public_id
          });

          return res.status(201).json({
            newFile
          });
        })
        .catch(err => {
          return res.json({
            ok: false,
            err
          });
        });
    } catch (error) {
      return res.json({
        ok: false,
        err,
        error
      });
    }
  }
};
