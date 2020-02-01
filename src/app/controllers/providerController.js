const ProviderModel = require("../models/provider");

module.exports = {
  async index(req, res) {
    const { email } = req.body;

    try {
      const provider = await ProviderModel.findOne({ email });

      if (!provider) {
        return res.json({
          error: true,
          message: `Provider: ${email} not found `
        });
      }

      return res.json(provider);
    } catch (error) {
      return res.json(error);
    }
  },

  async store(req, res) {
    const {
      name,
      fancyName,
      document,
      phone,
      email,
      latitude,
      longitude,
      password
    } = req.body;

    try {
      const provider = await ProviderModel.findOne({ email });

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      if (!provider) {
        const newProvider = await ProviderModel.create({
          name,
          fancyName,
          document,
          email,
          phone,
          password,
          location
        });

        return res.json(newProvider);
      }

      return res.json({
        error: true,
        message: "Provider already registered"
      });
    } catch (error) {
      return res.json(error);
    }
  },
  async delete(req, res) {
    const { email } = req.body;

    try {
      const provider = ProviderModel.findOne({ email });

      if (!provider) {
        return res.status(400).json({
          error: true,
          message: `Provider with email: ${email} not exists`
        });
      }

      provider
        .remove()
        .then(deleted => {
          return res.json({
            deleted: true,
            message: `Provider with email: ${email} has been successfully removed`,
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
    const { name, phone, email, newEmail } = req.body;

    ProviderModel.findOneAndUpdate(
      { email },
      {
        email: newEmail,
        name,
        phone
      }
    ).then(async () => {
      const newProvider = await ProviderModel.findOne({
        email: newEmail
      });

      return res.json(newProvider);
    });

    try {
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
