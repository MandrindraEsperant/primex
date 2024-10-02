const express = require('express');
const employeRoutes = require('./routes/employeRoutes');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());
app.use('/employe', employeRoutes);

// Synchroniser la base de données sans supprimer les tables existantes
sequelize.sync({ force: false }) 
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database', err));

module.exports = app;
