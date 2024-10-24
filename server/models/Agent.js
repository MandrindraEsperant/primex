const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assure-toi d'avoir la connexion dans ce fichier

class Agent extends Sequelize.Model {}

Agent.init(
  {
    idAgent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paysAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactAgent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Ce contact est déjà apparient  email est déjà utilisée.' 
      }
    },
    adresseAgent : {
      type: DataTypes.STRING,
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
    modelName: "Agent",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = Agent;
