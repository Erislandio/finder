const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user");
const authConfig = require('../../config/auth.json')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserSchema.findOne({ email }).select('+password');

      if (!user) {
        return res.json({
          error: true,
          message: `User with email: ${email} not exists`
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
