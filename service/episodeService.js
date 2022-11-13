const Episodes = require('../models/episodes');
const Series = require('../models/series');

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

          console.log(newEpisode);

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
};
