const TransactionMaritime = require("../models/TransactionMaritime");
const IRepository = require("../interfaces/IRepository");
const Agent = require("../models/Agent");
const TransMaritime = require("../models/TransMaritime");

class TransactionMaritimeRepository extends IRepository {
  async create(TransactionData) {
    return await TransactionMaritime.create(TransactionData);
  }
  async countAll() {
    return await TransactionMaritime.count();
  }
  async findById(id) {
    return await TransactionMaritime.findByPk(id);
  }
  async findByMBL(mbl) {
    return await TransactionMaritime.findOne({ where: { numMBL: mbl } });
  }
  async findAll() {
    return await TransactionMaritime.findAll(
      {
        attributes: [
          'numMBL',
          'dateEmission',
          'dateDestination',
        ],
        include: [
          {
            model: TransMaritime,
            attributes: [
              'numIMO',
              'armateur',
              'dateChargement',
              'paysChargement',
              'paysDechargement',
            ],
            required: true, // pour forcer la jointure
          },
          {
            model: Agent,
            as: 'agentExp', // alias pour l'agent expéditeur
            attributes: ['nomAgent'],
            required: true, // pour forcer la jointure
          },
          {
            model: Agent,
            as: 'agentDest', // alias pour l'agent destinataire
            attributes: ['nomAgent'],
            required: true, // pour forcer la jointure
          },
        ],
      }
    );
  }
  async update(id, TransactionData) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await TransactionMaritime.update(TransactionData,{where: { idTransactionMaritime: id }});
    }
    return null;
  }
  async delete(id) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await TransactionMaritime.destroy({ where: { idTransactionMaritime: id } });
    }
    return null;
  }
}

module.exports = TransactionMaritimeRepository;
