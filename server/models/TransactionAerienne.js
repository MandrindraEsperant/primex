const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TransportAerienne = require("./TransAerienne");
const Agent = require("./Agent");

class TransactionAerienne extends Sequelize.Model {}

TransactionAerienne.init(
  {
    idTransactionAerienne: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numMWL: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le Numero MBL est déjà appartient au autre TransactionAerienne",
      },
    },
    idTransport: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TransportAerienne,
        key: "idTransAerienne",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    idAgentDest:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Agent,
        key: "idAgent",
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
    dateEmission:{
        type:DataTypes.DATE,
         allowNull:false
     },
    dateDestination:{
        type:DataTypes.DATE,
         allowNull:false
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
    modelName: "TransactionAerienne",
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

module.exports = TransactionAerienne;
