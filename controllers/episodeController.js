const { episodeService } = require('../service');

const listEpisodes = async (req, res) => {
  try {
    const { title } = req.params;

    const result = await episodeService
      .listEpisodes(title)
      .catch((error) => error);
    res.status(result.status).send({ result });
  } catch (error) {
    res.status(500).send(error);
  }
};

const oneEpisode = async (req, res) => {
  try {
    const { title, episodeId } = req.params;

    const result = await episodeService
      .oneEpisode(title, episodeId)
      .catch((error) => error);
    res.status(result.status).send({ result });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createEpisode = async (req, res) => {
  try {
    const { title, description, video, serie } = req.body;

    const newEpisode = await episodeService.createEpisode(
      title,
      description,
      video,
      serie
    );
    res.status(200).send({
      message: 'El episodio ha sido creado correctamente ',
      newEpisode,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createEpisode,
  listEpisodes,
  oneEpisode,
};
