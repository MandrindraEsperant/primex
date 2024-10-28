const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 
const HWBTransaction =require('./HWBTransaction')

class MarchandiseHWB extends Sequelize.Model {}

MarchandiseHWB.init(
  {
    idMarchandiseHWB: {
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
    HWB: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: HWBTransaction, 
        key: 'numHWB',
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
    modelName: "MarchandiseHWB",
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

module.exports = MarchandiseHWB;
