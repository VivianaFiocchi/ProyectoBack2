const Series = require('../models/series');

const listSeries = () => {
  return new Promise((resolve, reject) => {
    Series.find(
      {},
      { title: 1, category: 1, image: 1, cartegory: 1 },
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

module.exports = {
  listSeries,
  createSeries,
};
