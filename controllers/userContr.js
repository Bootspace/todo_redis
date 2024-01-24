const { logger } = require('../utils/logging');
const { User }= require('../database/models');

exports.createUser = async(req, res) => {
  try {
    const { name, email } = req.body;
    const checkMail = await User.findAll({
      where: {
        email: req.body.email
      }
    });

    if(checkMail != 0) {
      return logger(200, "email already used, try another email", "failed", res);
    }

    const newUser = await User.create({ name, email });
    return logger(201, "user created", "success", res);
    
  } catch (error) {
    return logger(500, "internal server error", "failed", res)
  }
}