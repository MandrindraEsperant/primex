const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Employe= require("./Employe");
const MBL = require("./MBL");

class Conteneur extends Sequelize.Model {}
Conteneur.init(
  {
    idConteneur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numConteneur: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le Numero MBL est déjà appartient au autre Conteneur",
      },
    },
    typeConteneur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numPlomb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numMBL: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: MBL,
        key: "numMBL",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    creerPar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employe,
        key: "idEmploye",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    modifierPar: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employe,
        key: "idEmploye",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Conteneur",
    timestamps: true,
  }
);
Conteneur.belongsTo(MBL, { foreignKey: "numMBL" });

module.exports = Conteneur;
