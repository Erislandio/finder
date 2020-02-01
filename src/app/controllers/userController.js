const UserModel = require("../models/user");

module.exports = {
  async index(req, res) {
    const { email } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.json({
          error: true,
          message: `Email: ${email} not found `
        });
      }

      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  },

  async store(req, res) {
    const {
      name,
      lastname,
      document,
      phone,
      email,
      latitude,
      longitude,
      password
    } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      if (!user) {
        const newUser = await UserModel.create({
          name,
          lastname,
          document,
          email,
          phone,
          password,
          location
        });

        return res.json(newUser);
      }

      return res.json({
        error: true,
        message: "User already registered"
      });
    } catch (error) {
      return res.json(error);
    }
  },
  async delete(req, res) {
    const { email } = req.body;

    try {
      UserModel.findByIdAndDelete({ email })
        .then(deleted => {
          return res.json(deleted);
        })
        .catch(err => {
          return res.json(err);
        });
    } catch (error) {
      return res.json(error);
    }
  }
};
