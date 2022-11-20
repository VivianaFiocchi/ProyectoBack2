const { check } = require('express-validator');

module.exports = [
  check('favoriteSerie')
    .exists()
    .notEmpty()
    .withMessage('El ID de la serie es un campo requerido.'),
];
