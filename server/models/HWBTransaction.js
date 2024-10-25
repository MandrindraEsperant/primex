const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TransactionAerienne = require("./TransactionAerienne");
const Client = require("./Client");

class HWBTransaction extends Sequelize.Model {}

HWBTransaction.init(
  {
    idHWBTransaction: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numHWB: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce numéro HWB est déjà utilisée.",
      },
    },
    idMWB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TransactionAerienne,
        key: "idTransactionAerienne",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    dateHWBTransaction: {
      type: DataTypes.DATE,
      allowNull: false,
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
    modelName: "HWBTransaction",
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

module.exports = HWBTransaction;
