const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TransactionMaritime = require("./TransactionMaritime");
const Client = require("./Client");

class HBLTransaction extends Sequelize.Model {}

HBLTransaction.init(
  {
    idHBLTransaction: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numHBL: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce numéro HBL est déjà utilisé.",
      },
    }, 
    idMBL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TransactionMaritime,
        key: "idTransactionMaritime",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    dateHBLTransaction: {
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
    modelName: "HBLTransaction",
    timestamps: true,
    validate: {
      expediteurDifferentDeDestinataire() {
        if (this.idExpediteur === this.idDestinataire) {
          throw new Error("idExpediteur doit être différent de idDestinataire.");
        }
      },
    },
  }
);

// Définir les associations
HBLTransaction.belongsTo(Client, { as: 'clientExp', foreignKey: 'idExpediteur' });
HBLTransaction.belongsTo(Client, { as: 'clientDest', foreignKey: 'idDestinataire' });
HBLTransaction.belongsTo(TransactionMaritime, { foreignKey: 'idMBL' });

module.exports = HBLTransaction;
