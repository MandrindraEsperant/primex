const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assure-toi d'avoir la connexion dans ce fichier

class Client extends Sequelize.Model {}

Client.init(
  
  {
    idClient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nomClient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailClient: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    CINClient: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
  },
  {
    sequelize,
    modelName: 'Client',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = Client;