const UserModel = require("../models/user");

module.exports = {
  async index(req, res) {
    const { email } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({
          error: true,
          message: `Email: ${email} not found `
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async store(req, res) {
    const {
      name,
      lastname,
      document,
      phone,
      email,
      password,
      image
    } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        const newUser = await UserModel.create({
          name,
          lastname,
          document,
          email,
          phone,
          password,
          image
        });

        return res.status(200).json(newUser);
      }

      return res.status(400).json({
        error: true,
        message: "User already registered"
      });
    } catch (error) {
      return res.status(500).json(error);
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
          return res.status(201).json({
            deleted: true,
            message: `User with email: ${email} has been successfully removed`,
            info: deleted
          });
        })
        .catch(err => {
          return res.status(400).json(err);
        });
    } catch (error) {
      return res.status(500).json(error);
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
    )
      .then(async () => {
        const newUser = await UserModel.findOne({
          email: newEmail
        });

        return res.status(200).json(newUser);
      })
      .catch(err => {
        return res.status(400).json({
          error: true,
          err,
          message: "The user could not be updated at this time"
        });
      });

    try {
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async updateImage(req, res) {
    const { email, image } = req.body;

    try {
      const user = UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: true,
          message: `User with email: ${email} not exists`
        });
      }

      await user.update({
        image
      });

      const userUpdated = await UserModel.findOne({ email });

      return res.status(200).json(userUpdated);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
