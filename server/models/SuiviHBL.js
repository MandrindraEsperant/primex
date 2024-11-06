const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const HBLTransaction = require('./HBLTransaction')
class SuiviHBL extends Sequelize.Model {}
SuiviHBL.init(
  {
    idSuiviHBL: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numHBL: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: HBLTransaction,
        key: "numHBL",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    etape: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateEtape:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false
    },
    commentaire:{
      type: DataTypes.STRING,
      allowNull: true
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
    modelName: "SuiviHBL",
    timestamps: true ,
    indexes: [
      {
        unique: true,
        fields: ["numHBL", "etape"]
      }
    ]
  }
);

module.exports = SuiviHBL;