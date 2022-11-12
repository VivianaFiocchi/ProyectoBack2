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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService
      .login(email, password)
      .catch((error) => error);

    res.status(result.status).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
};
