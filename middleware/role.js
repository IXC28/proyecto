const jwt = require('jsonwebtoken');
const User = require('../models/user');



const role = async (request, response, next) => {
try {
  const logiado = request.login;
  if (!logiado) {
    return next();
  }


  const user = request.user;
  const rol = user.rol;


  request.rol = rol;

  next();

} catch (error) {
  console.log(error);
  return next();
}


};

module.exports = { role};