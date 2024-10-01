const express = require('express');
const employeRoutes = require('./routes/employeRoutes');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());
app.use('/employe', employeRoutes);

sequelize.sync({ force: true }) // Synchroniser la base de données
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database', err));

module.exports = app;
