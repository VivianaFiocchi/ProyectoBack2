const { episodeService } = require('../service');
const { validationResult } = require('express-validator');

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
    const resultValidationReq = validationResult(req);
    const hasError = !resultValidationReq.isEmpty();
    const { title, description, video, serie } = req.body;

    if (hasError) {
      return res.status(400).send(resultValidationReq);
    }

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

const updateEpisode = async (req, res) => {
  const { id } = req.params;
  const { title, description, video } = req.body;
  try {
    const updatedEpisode = await episodeService.updateEpisode(
      id,
      title,
      description,
      video
    );
    res.status(201).send({
      message: 'El episodio ha sido actualizado correctamente ',
      updatedEpisode,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteEpisode = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteEpisode = await episodeService.deleteEpisode(id);
    res.status(200).send({
      message: 'El episodio ha sido eliminado correctamente ',
      deleteEpisode,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createEpisode,
  listEpisodes,
  oneEpisode,
  updateEpisode,
  deleteEpisode,
};
