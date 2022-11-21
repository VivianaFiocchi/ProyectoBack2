const Series = require('../models/series');
const Episodes = require('../models/episodes');
const User = require('../models/user');

const listSeries = () => {
  return new Promise((resolve, reject) => {
    Series.find(
      {},
      { title: 1, description: 1, category: 1, image: 1 },
      (error, series) => {
        if (error) {
          reject({
            status: 404,
            message: 'Datos no encontrados',
          });
        } else {
          resolve({
            status: 200,
            message: series,
          });
        }
      }
    );
  });
};

const detailSeries = (id) => {
  return new Promise((resolve, reject) => {
    Series.findById(id, (error, serie) => {
      if (error) {
        reject({ status: 400, message: 'ID erroneo' });
      }
      if (!serie) {
        reject({
          status: 404,
          message: 'La serie no existe',
        });
      } else {
        Episodes.find({ serie: id }, (error, result) => {
          if (error) {
            reject({
              status: 404,
              message: 'Datos no encontrados',
            });
          } else {
            resolve({
              status: 200,
              id: serie._id,
              title: serie.title,
              description: serie.description,
              image: serie.image,
              capList: result,
            });
          }
        });
      }
    });
  });
};

const createSeries = (title, description, image, category) => {
  return new Promise((resolve, reject) => {
    Series.findOne({ title }, (err, serie) => {
      if (err) {
        reject(err);
      }
      if (serie) {
        reject('La serie ya existe');
      }

      const newSerie = new Series({ title, description, image, category });
      newSerie.save(() => {
        resolve(newSerie);
      });
    });
  });
};

const updateSeries = (id, title, description, image, category) => {
  return new Promise((resolve, reject) => {
    Series.findByIdAndUpdate(
      { _id: id },
      { title, description, image, category },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

const deleteSeries = (id) => {
  return new Promise((resolve, reject) => {
    Series.findByIdAndDelete(id, (err, result) => {
      if (err) {
        reject(err);
      } else if (!result) {
        reject('El ID ingresado no existe.');
      }
      result.capList.map((e) => {
        Episodes.findByIdAndDelete(String(e), (err, result) => {
          if (err) {
            reject(err);
          } else if (!result) {
            reject('El ID ingresado no existe.');
          }
        });
      });

      resolve(result);
    });
  });
};

module.exports = {
  listSeries,
  createSeries,
  updateSeries,
  deleteSeries,
  detailSeries,
};
