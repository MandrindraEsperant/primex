const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TransportMaritime = require("./TransMaritime");
const Agent = require("./Agent");

class Transaction extends Sequelize.Model {}

Transaction.init(
  {
    idSuivi: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    numMBL: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: TransportMaritime,
        key: "idTransMaritime",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    etape: {
      type: DataTypes.INTEGER,
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
