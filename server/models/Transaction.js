const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TransportMaritime = require("./TransMaritime");
const Agent = require("./Agent");

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
    idTransport: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TransportMaritime,
        key: "idTransMaritime",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    idAgentDest:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Agent,
        key: "idClient",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    idAgentExp:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Agent,
        key: "idAgent",
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
    modelName: "Transaction",
    timestamps: true,
    validate: {
      expediteurDifferentDeDestinateur() {
        if (this.idAgentDest === this.idAgentExp) {
          throw new Error("idTransitExpediteur doit être différent de idTransitDestinateur.");
        }
      },
    }, 
  }
);

module.exports = Transaction;
