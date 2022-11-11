const { userService } = require('../service');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService
      .register(email, password)
      .catch((error) => error);

    res.status(result.status).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(403).send({ messsage: `El campo email es requerido.` });
  }
  User.findOne({ email: email }, (error, user) => {
    if (error) {
      res.status(500).send({
        messsage: `Se produjo un error al loguear el usuario. ${error}`,
      });
    }
    if (
      !user ||
      !req.body.password ||
      !user.comparePassword(req.body.password)
    ) {
      res
        .status(404)
        .send({ messsage: 'El Usuario no existe o la Clave es incorrecta.' });
    }

    req.user = user;
    res.status(200).send({
      message: 'Te has logueado correctamente.',
      token: service.createToken(user),
    });
  });
};

module.exports = {
  register,
  login,
};
