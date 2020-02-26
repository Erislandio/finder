const Provider = require("../models/provider");
const User = require("../models/user");

module.exports = {
  async indexByProviderId(req, res) {
    const { id } = req.body;

    try {
      const provider = await Provider.findById(id);

      return res.status(200).json(provider.assessments);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "internal server error"
      });
    }
  },
  async store(req, res) {
    const { user_id, provider_id, comment, title, stars } = req.body;

    try {
      const user = await User.findById(user_id);

      if (!user) {
        return res.status(400).json({
          error: true,
          message: "User not found!"
        });
      }

      const provider = await Provider.findById(provider_id);

      const findUserPost = provider.assessments.find(assessment => {
        return assessment.user.name.toLowerCase() === user.name.toLowerCase();
      });

      if (findUserPost) {
        return res.status(400).json({
          error: true,
          message: "user has already made a comment"
        });
      }

      const assessments = {
        user: {
          name: user.name,
          lastname: user.lastname,
          id: user._id,
          image: user.image
            ? user.image
            : "https://www.landscapingbydesign.com.au/wp-content/uploads/2018/11/img-person-placeholder.jpg"
        },
        comment,
        title,
        stars
      };

      provider
        .updateOne({
          $push: { assessments }
        })
        .then(async () => {
          const searchProvider = await Provider.findById(provider_id);

          return res.status(201).json(searchProvider);
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: "internal server error"
          });
        });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "internal server error"
      });
    }
  },
  async update(req, res) {
    const { user_id, provider_id, comment, title, stars } = req.body;

    try {
      const user = await User.findById(user_id);

      if (!user) {
        return res.status(400).json({
          error: true,
          message: "User not found!"
        });
      }

      const assessments = {
        user: {
          name: user.name,
          lastname: user.lastname,
          id: user._id
        },
        comment,
        title,
        stars
      };

      const provider = await Provider.findById(provider_id);

      const newPosts = await provider.assessments
        .map(item => {
          if (item.user.id !== user._id) {
            return {
              ...item,
              ...assessments
            };
          }
        })
        .filter(Boolean);

      provider
        .updateOne({ assessments: newPosts })
        .then(async () => {
          const searchProvider = await Provider.findById(provider_id);

          return res.status(201).json(searchProvider.assessments);
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: "internal server error"
          });
        });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "internal server error"
      });
    }
  },
  async delete(req, res) {
    const { user_id, provider_id } = req.body;

    try {
      const user = await User.findById(user_id);

      if (!user) {
        return res.status(400).json({
          error: true,
          message: "User not found!"
        });
      }

      const provider = await Provider.findById(provider_id);

      const posts = provider.assessments.filter(assessment => {
        return assessment.user.name !== user.name;
      });

      provider
        .updateOne({ assessments: posts })
        .then(async () => {
          return res.status(201).json({ message: "Success!" });
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: "internal server error"
          });
        });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "internal server error"
      });
    }
  }
};
