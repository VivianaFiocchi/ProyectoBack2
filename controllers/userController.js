const { userService } = require('../service');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  try {
    const resultValidationReq = validationResult(req);
    const hasError = !resultValidationReq.isEmpty();
    const { email, password } = req.body;

    if (hasError) {
      return res.status(400).send(resultValidationReq);
    }

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
