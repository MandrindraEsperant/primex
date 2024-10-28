const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const HWBTransaction = require('./HWBTransaction')
class SuiviHWB extends Sequelize.Model {}
SuiviHWB.init(
  {
    idSuiviHWB: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    numHWB: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: HWBTransaction,
        key: "numHWB",
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
    modelName: "SuiviHWB",
    timestamps: true ,
    indexes: [
      {
        unique: true,
        fields: ["numHWB", "etape"]
      }
    ]
  }
);

module.exports = SuiviHWB;
