const Provider = require("../models/provider");

module.exports = {
  async index(request, response) {
    const { latitude, longitude } = request.body;

    const providers = await Provider.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json({ providers });
  },
  async searchByType(request, response) {
    const { latitude, longitude, type } = request.body;

    const providers = await Provider.find({
      type: {
        $in: type
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 100000
        }
      }
    });

    return response.json({ providers });
  }
};
