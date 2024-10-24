const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TransportMaritime = require("./TransMaritime");
const TransportAerienne = require("./TransAerienne");

class Transaction extends Sequelize.Model {}

Transaction.init(
  {
    idTransaction: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    numMBL: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le Numero MBL est déjà appartient au autre transaction",
      },
    },
    modeTransport: {
      type: DataTypes.ENUM("Maritime", "Aerienne"),
      allowNull: false,
    },
    idTransport: {
      type: DataTypes.INTEGER,
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
    modelName: "Transaction",
    timestamps: true,
  }
);

// Définir les associations polymorphes
Transaction.belongsTo(TransportMaritime, {
  foreignKey: 'idTransport',
  constraints: false,
  as: 'transportMaritime',
  scope: {
    modeTransport: 'Maritime',
  },
});

Transaction.belongsTo(TransportAerienne, {
  foreignKey: 'idTransport',
  constraints: false,
  as: 'transportAerienne',
  scope: {
    modeTransport: 'Aerienne',
  },
});

module.exports = Transaction;
