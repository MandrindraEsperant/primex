const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assure-toi d'avoir la connexion dans ce fichier

class Exportation extends Sequelize.Model {}

Exportation.init(
  {
    idExportation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateExportation:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    numMBL:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    modeTransport: {
        type: DataTypes.ENUM('Maritime', 'Aerienne'),
        allowNull: false
    },
    idTransport: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creerPar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modifierPar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Exportation",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = Exportation;