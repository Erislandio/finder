const UserModel = require("../models/user");
const { findConnections, sendMessage } = require("../../websocket");
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

        const sendSocketMessageTo = findConnections(
          { latitude, longitude },
          techsArray
        );

        sendMessage(sendSocketMessageTo, "new-user", dev);

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
      const user = UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({
          error: true,
          message: `User with email: ${email} not exists`
        });
      }

      user
        .remove()
        .then(deleted => {
          return res.json({
            deleted: true,
            message: `User with email: ${email} has been successfully removed`,
            info: deleted
          });
        })
        .catch(err => {
          return res.status(400).json(err);
        });
    } catch (error) {
      return res.json(error);
    }
  },
  async update(req, res) {
    const { name, lastname, phone, email, newEmail } = req.body;

    UserModel.findOneAndUpdate(
      { email },
      {
        email: newEmail,
        name,
        lastname,
        phone
      }
    ).then(async () => {
      const newUser = await UserModel.findOne({
        email: newEmail
      });

      console.log(newUser);

      return res.json(newUser);
    });

    try {
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
