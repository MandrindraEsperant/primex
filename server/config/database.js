const { Sequelize } = require('sequelize');

// Configurer la connexion MySQL
const sequelize = new Sequelize('solid_node_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
