const { check } = require("express-validator");

module.exports = [
  check("title")
    .exists()
    .notEmpty()
    .withMessage("El Titulo es un campo requerido.")
    .isLength({ max: 100 })
    .withMessage("El Titulo debe tener como maximo 2000 caracteres"),

  check("description")
    .exists()
    .notEmpty()
    .withMessage("Descripcion es un campo requerido requerido.")
    .isLength({ max: 2000 })
    .withMessage("La descripcion debe tener como maximo 2000 caracteres"),

  check("image")
    .exists()
    .notEmpty()
    .withMessage("Imagen es un campo requerido requerido.")
    .custom(
      (value, { req }) => value.includes("www.") && value.includes(".com")
    )
    .withMessage("Enlace no valido"),

  check("category")
    .exists()
    .notEmpty()
    .withMessage("La categoria es un campo requerido.")
    .isLength({ max: 50 })
    .withMessage("La categoria debe tener como maximo 50 caracteres"),
];
