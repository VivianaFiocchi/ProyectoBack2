const { seriesService } = require('../service');

const listSeries = async (req, res) => {
  try {
    const result = await seriesService.listSeries().catch((error) => error);
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

module.exports = {
  listSeries,
  createSeries,
};
