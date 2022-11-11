const User = require('../models/user');
const authService = require('./authService');

const register = (email, password) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      email: email,
      password: password,
    });

    User.findOne({ email: newUser.email }, (error, user) => {
      if (error) {
        reject({
          status: 500,
          messsage: `Se produjo un error al registrar el nuevo usuario. ${error}`,
        });
      }
      if (user) {
        reject({
          status: 403,
          messsage: 'El email ingresado ya se encuentra en uso.',
        });
      }

      newUser.save((error) => {
        if (error) {
          reject({
            status: 500,
            messsage: `Se produjo un error al registrar el nuevo usuario. ${error}`,
          });
        }

        resolve({
          status: 200,
          token: authService.createToken(newUser),
        });
      });
    });
  });
};

const login = () => {};

module.exports = {
  register,
  login,
};
