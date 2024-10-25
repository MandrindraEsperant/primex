const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 
const HBLTransaction =require('./HBLTransaction')

class MarchandiseHBL extends Sequelize.Model {}

MarchandiseHBL.init(
  {
    idMarchandiseHBL: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
    HBL: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: HBLTransaction, 
        key: 'numHBL',
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
    modelName: "MarchandiseHBL",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = MarchandiseHBL;
