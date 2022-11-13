const { episodeService } = require('../service');

const createEpisode = async (req, res) => {
  try {
    const { title, description, video, serieId } = req.body;

    const newEpisode = await episodeService.createEpisode(
      title,
      description,
      video,
      serieId
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
};
