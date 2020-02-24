const ProviderModel = require("../models/provider");

module.exports = {
  async index(req, res) {
    const { email } = req.body;

    try {
      const provider = await ProviderModel.findOne({ email });

      if (!provider) {
        return res.status(400).json({
          error: true,
          message: `Provider: ${email} not found `
        });
      }

      return res.status(200).json(provider);
    } catch (error) {
      return res.status(500).json(error);
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
      password,
      type
    } = req.body;

    try {
      const provider = await ProviderModel.findOne({ email });
      const providerDocument = await ProviderModel.findOne({ document });
      const providerPhone = await ProviderModel.findOne({ phone });

      const lat = latitude ? latitude : 0;
      const lon = longitude ? longitude : 0;

      const location = {
        type: "Point",
        coordinates: [lon, lat]
      };

      if (!provider && !providerDocument && !providerPhone) {
        const newProvider = await ProviderModel.create({
          name,
          fancyName,
          document,
          email,
          phone,
          password,
          location,
          type
        });

        return res.status(201).json(newProvider);
      }

      return res.json({
        error: true,
        message: "Provider already registered"
      });
    } catch (error) {
      return res.status(500).json(error);
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
          return res.status(201).json({
            deleted: true,
            message: `Provider with email: ${email} has been successfully removed`,
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
    const { name, phone, email, newEmail } = req.body;

    try {
      ProviderModel.findOneAndUpdate(
        { email },
        {
          email: newEmail,
          name,
          phone
        }
      )
        .then(async () => {
          const newProvider = await ProviderModel.findOne({
            email: newEmail
          });

          return res.status(201).json(newProvider);
        })
        .catch(err => {
          return res.status(400).json({
            error: true,
            err,
            message: "The provider could not be updated at this time"
          });
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async updateBanner(req, res) {
    const { email, banner } = req.body;

    try {
      const provider = await ProviderModel.findOne({ email });

      if (!provider) {
        return res.status(400).json({
          error: true,
          message: `Provider: ${email} not found `
        });
      }

      await provider.update({
        banner
      });

      const providerUpdated = await ProviderModel.findOne({ email });

      return res.status(200).json(providerUpdated);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async updateImage(req, res) {
    const { email, image } = req.body;

    try {
      const provider = await ProviderModel.findOne({ email });

      if (!provider) {
        return res.status(400).json({
          error: true,
          message: `Provider: ${email} not found `
        });
      }

      await provider.update({
        image
      });

      const providerUpdated = await ProviderModel.findOne({ email });

      return res.status(201).json(providerUpdated);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async updateBanner(req, res) {
    const { email, banner } = req.body;

    try {
      const provider = await ProviderModel.findOne({ email });

      if (!provider) {
        return res.status(400).json({
          error: true,
          message: `Provider: ${email} not found `
        });
      }

      await provider.update({
        banner
      });

      const providerUpdated = await ProviderModel.findOne({ email });

      return res.status(201).json(providerUpdated);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
