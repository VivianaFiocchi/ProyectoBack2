const { seriesService } = require('../service');

const listSeries = async (req, res) => {
  try {
    const result = await seriesService.listSeries().catch((error) => error);
    res.status(result.status).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const detailSeries = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await seriesService.detailSeries(id).catch((error) => error);
    res.status(result.status).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createSeries = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;
    const newSerie = await seriesService.createSeries(
      title,
      description,
      image,
      category
    );
    res.status(201).send({
      message: 'La serie ha sido creado correctamente ',
      newSerie,
    });
  } catch (error) {
    res.status(500).send({
      messsage: `Se produjo un error al crear la serie. ${error}`,
    });
  }
};

const updateSeries = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, category } = req.body;
  try {
    const updatedSeries = await seriesService.updateSeries(
      id,
      title,
      description,
      image,
      category
    );
    res.status(201).send({
      message: 'La serie ha sido actualizada correctamente ',
      updatedSeries,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteSeries = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteSeries = await seriesService.deleteSeries(id);
    res.status(200).send({
      message: 'La serie ha sido eliminada correctamente ',
      deleteSeries,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  listSeries,
  createSeries,
  updateSeries,
  deleteSeries,
  detailSeries,
};
