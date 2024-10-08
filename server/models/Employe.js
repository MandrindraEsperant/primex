const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assure-toi d'avoir la connexion dans ce fichier

class Employe extends Sequelize.Model {}

Employe.init(
  {
    idEmployer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nomEmploye: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailEmploye: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validation pour s'assurer que c'est un email valide
      },
    },
    motDePasse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeEmploye: {
      type: DataTypes.ENUM('Employe', 'Administrateur'),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Employe',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = Employe;
