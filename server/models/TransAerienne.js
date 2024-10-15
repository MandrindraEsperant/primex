const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assure-toi d'avoir la connexion dans ce fichier

class TransAerienne extends Sequelize.Model {}

TransAerienne.init(
  {
    idTransAerienne: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numVol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le numero de vol est déjà existé.' 
      },
    },
    nomCompagnie: {
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
    modelName: "TransAerienne",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = TransAerienne;
