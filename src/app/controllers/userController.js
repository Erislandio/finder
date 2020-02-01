const UserModel = require("../models/user");

module.exports = {
  async store(req, res) {
    const {
      name,
      lastname,
      document,
      phone,
      email,
      latitude,
      longitude
    } = req.body;

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
        location
      });
    }
  }
};
