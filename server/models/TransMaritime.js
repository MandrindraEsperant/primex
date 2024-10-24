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
    numIMO: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg:""
      }
    },
    armateur: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nomNavire: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateChargement: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateDechargement: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paysChargement:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    villeChargement:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    paysDechargement:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    villeDechargement:{
      type:DataTypes.STRING,
      allowNull:false,
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
