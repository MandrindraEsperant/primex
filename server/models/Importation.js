const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assure-toi d'avoir la connexion dans ce fichier
const Client = require("./Client");

class Importation extends Sequelize.Model {}

Importation.init(
  {
    idImportation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateImportation:{
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
    idExpediteur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "idClient",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    idDestinataire: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "idClient",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
    modelName: "Importation",
    timestamps: true,
    validate: {
      expediteurDifferentDeDestinateur() {
        if (this.idExpediteur === this.idDestinateur) {
          throw new Error("idExpediteur doit être différent de idDestinateur.");
        }
      },
    }, 
  }
);

module.exports = Importation;