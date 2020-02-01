const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user");
const authConfig = require("../../config/auth.json");
const ProviderSchema = require("../models/provider");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

module.exports = {
  async login(req, res) {
    const { email, password, provider } = req.body;

    try {
      const user = provider
        ? await ProviderSchema.findOne({ email }).select("+password")
        : await UserSchema.findOne({ email }).select("+password");

      if (!user) {
        return res.json({
          error: true,
          message: `email: ${email} not exists`
        });
      }

      if (!(await bcrypt.compare(password, user.password)))
        return res.json({
          error: true,
          message: "Incorrect password"
        });

      return res.json({
        user,
        token: generateToken({ id: user.id })
      });
    } catch (error) {
      return res.json(error);
    }
  }
};
