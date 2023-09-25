const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userExtractor = async (request, response, next) => {
  try {
    const token = request.cookies?.accessToken;
    if (!token) {

      request.login = false;
      return next();

    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    request.user = user;
    request.login = true;

    next();

  } catch (error) {

    request.login = false;
    return next(error);
  }



};

module.exports = { userExtractor };