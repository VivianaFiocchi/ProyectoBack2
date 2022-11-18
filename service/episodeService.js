const Episodes = require('../models/episodes');
const Series = require('../models/series');

const listEpisodes = (title) => {
  return new Promise((resolve, reject) => {
    Series.findOne({ title: title }, (error, serie) => {
      if (error) {
        reject({
          status: 500,
          messsage: `Se produjo un error al buscar la serie. ${error}`,
        });
      }
      if (!serie) {
        reject({
          status: 500,
          messsage: `La serie ${title} no se encuentra en la base de datos.`,
        });
      } else {
        Episodes.find({ serie: String(serie._id) }, (error, episodes) => {
          if (error) {
            reject({
              status: 404,
              message: 'Datos no encontrados',
            });
          } else {
            resolve({
              status: 200,
              message: episodes,
            });
          }
        });
      }
    });
  });
};

const oneEpisode = (title, episodeId) => {
  return new Promise((resolve, reject) => {
    Series.findOne({ title: title }, (error, serie) => {
      if (error) {
        reject({
          status: 500,
          messsage: `Se produjo un error al buscar la serie. ${error}`,
        });
      }
      if (!serie) {
        reject({
          status: 500,
          messsage: `La serie ${title} no se encuentra en la base de datos.`,
        });
      } else {
        Episodes.findById({ _id: episodeId }, (error, episode) => {
          if (error) {
            reject({
              status: 404,
              message: 'Datos no encontrados',
            });
          } else {
            resolve({
              status: 200,
              message: episode,
            });
          }
        });
      }
    });
  });
};

const createEpisode = (title, description, video, serieId) => {
  return new Promise((resolve, reject) => {
    Series.findById(serieId, (error, serie) => {
      if (error) {
        reject(error);
      }
      if (!serie) {
        reject('La serie no existe');
      }
      if (serie) {
        Episodes.findOne({ title }, (error, episode) => {
          if (error) {
            reject(error);
          }
          if (episode) {
            reject('El episodio ya existe');
          }
          const newEpisode = new Episodes({
            title,
            description,
            video,
            serie: serieId,
          });

          newEpisode.save(() => {
            resolve(newEpisode);
          });

          serie.capList.push(newEpisode._id);
          serie.save();
        });
      }
    });
  });
};

module.exports = {
  createEpisode,
  listEpisodes,
  oneEpisode,
};
