const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config();

app.use('/api', routes);

mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true },
  (error, response) => {
    if (error) {
      return console.log(`Error al conectar a la base de datos ${error}`);
    }
    console.log('Conexion a la base de datos establecida. ');
    app.listen(process.env.PORT, () => {
      console.log(`Hamster rolling on port ${process.env.port}`);
    });
  }
);
