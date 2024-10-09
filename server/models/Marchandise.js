const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assure-toi d'avoir la connexion dans ce fichier

class Marchandise extends Sequelize.Model {}

Marchandise.init(
  {
    idMarchandise: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    typeExpedition: {
      type: DataTypes.ENUM("Importation", "Exportation"),
      allowNull: false,
    },
    idExpedition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numConteneur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeConteneur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numPlomb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nature: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nbColis: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    poid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    volume: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    modelName: "Marchandise",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = Marchandise;
