const TransactionAerienne = require("../models/TransactionAerienne");
const Agent = require("../models/Agent");
const TransAerienne = require("../models/TransAerienne");
const IRepository = require("../interfaces/IRepository");

class TransactionAerienneRepository extends IRepository {
  async create(TransactionData) {
    return await TransactionAerienne.create(TransactionData);
  }
  async countAll() {
    return await TransactionAerienne.count();
  }
  async findById(id) {
    return await TransactionAerienne.findByPk(id);
  }
  async findByMWL(mwl) {
    return await TransactionAerienne.findOne({ where: { numMWL: mwl } });
  }
  async findAll() {
    return await TransactionAerienne.findAll({
      attributes: [
        'idTransactionAerienne',
        'numMWL',
        'dateEmission',
        'dateDestination',
      ],
      include: [
        {
          model: TransAerienne,
          attributes: [
            'numVol',
            'nomCompagnie',
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
    });
  }
  async update(id, TransactionData) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await TransactionAerienne.update(TransactionData,{where: { idTransactionAerienne: id }});
    }
    return null;
  }
  async delete(id) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await TransactionAerienne.destroy({ where: { idTransactionAerienne: id } });
    }
    return null;
  }
}

module.exports = TransactionAerienneRepository;
