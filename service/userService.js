const User = require('../models/user');
const authService = require('./authService');
const Series = require('../models/series');

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

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (error, user) => {
      if (error) {
        reject({
          status: 500,
          messsage: `Se produjo un error al loguear el usuario. ${error}`,
        });
      }

      if (!user || !password || !user.comparePassword(password)) {
        reject({
          status: 404,
          messsage: 'El Usuario no existe o la Clave es incorrecta.',
        });
      }
      if (user) {
        resolve({
          status: 200,
          token: authService.createToken(user),
          messsage: `El Usuario: ${user.email}  se ha logueado correctamente.`,
        });
      }
    });
  });
};

const favorite = (email, favoriteSerie) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }, (error, user) => {
      if (error) {
        reject({ status: 400, message: `Se produjo un error: ${error}` });
      }
      if (!user) {
        reject({
          status: 404,
          message: 'El usuario no existe',
        });
      } else {
        Series.findById(favoriteSerie, (error, serie) => {
          if (error) {
            reject({ status: 400, message: 'ID erroneo' });
          }
          if (!serie) {
            reject({
              status: 404,
              message: 'La serie no existe',
            });
          }
          if (serie) {
            let isFavorite = user.favorites.some(
              (e) => String(e) === favoriteSerie
            );
            if (isFavorite) {
              reject({
                status: 400,
                message: `La serie ya se encuentra en la lista de favoritos del usuario ${user.email}`,
              });
            } else {
              user.favorites.push(favoriteSerie);
              user.save();
              serie.users.push(user._id);
              serie.save();
              resolve({
                status: 200,
                message: `Serie agregada a la lista de favoritos del usuario ${user.email}`,
              });
            }
          }
        });
      }
    });
  });
};

const listFavorites = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }, (error, user) => {
      if (error) {
        reject({
          status: 500,
          messsage: `Se produjo un error al buscar el usuario. ${error}`,
        });
      }
      if (!user) {
        reject({
          status: 500,
          messsage: `El usuario ${email} no se encuentra en la base de datos.`,
        });
      } else {
        Series.find(
          { users: String(user._id) },
          { title: 1, description: 1, image: 1, category: 1 },
          (error, result) => {
            if (error) {
              reject({
                status: 404,
                message: 'Datos no encontrados',
              });
            } else {
              resolve({
                status: 200,
                user: email,
                favorites: result,
              });
            }
          }
        );
      }
    });
  });
};

const deleteFavorite = (email, favoriteSerie) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }, (error, user) => {
      if (error) {
        reject({ status: 400, message: 'ID erroneo' });
      }
      if (!user) {
        reject({
          status: 404,
          message: 'El usuario no existe',
        });
      } else {
        Series.findById(favoriteSerie, (error, serie) => {
          if (error) {
            reject({ status: 400, message: 'ID erroneo' });
          }
          if (!serie) {
            reject({
              status: 404,
              message: `La serie no se encuentra en la lista de favoritos de ${user.email}.`,
            });
          }
          if (serie) {
            let isFavorite = user.favorites.some(
              (e) => String(e) === favoriteSerie
            );
            if (isFavorite) {
              user.favorites.pull(favoriteSerie);
              user.save();
              serie.users.pull(user._id);
              serie.save();
              resolve({
                status: 200,
                message: `La serie ha sido eliminada de la lista de favoritos del usuario ${user.email}`,
              });
            } else {
              reject({
                status: 400,
                message: `La serie no se encuentra en la lista de favoritos del usuario ${user.email}`,
              });
            }
          }
        });
      }
    });
  });
};

module.exports = {
  register,
  login,
  favorite,
  listFavorites,
  deleteFavorite,
};
