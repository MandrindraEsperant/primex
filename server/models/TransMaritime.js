const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assure-toi d'avoir la connexion dans ce fichier

class TransMaritime extends Sequelize.Model {}

TransMaritime.init(
  {
    idTransMaritime: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numHBL: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le numero de HBL est déjà existé.' 
      },
    },
    numBateau: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomBateau: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateDepart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateArriver: {
      type: DataTypes.DATE,
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
    modelName: "TransMaritime",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = TransMaritime;
