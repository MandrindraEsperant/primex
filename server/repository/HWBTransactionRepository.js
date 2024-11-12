const HWBTransaction = require('../models/HWBTransaction');
const IRepository = require('../interfaces/IRepository');
const TransactionAerienne = require('../models/TransactionAerienne');
const Client = require('../models/Client');
const { Where } = require('sequelize/lib/utils');

// const { Op } = require('sequelize');

class HWBTransactionRepository extends IRepository {
  async create(Data) {
    return await HWBTransaction.create(Data);
  }
  async findById(id) {
    return await HWBTransaction.findByPk(id);
  }
  async findByNum(num) {
    return await HWBTransaction.findOne({Where:{numHWB:num}});
  }
  // async countAll() {
  //   try {
  //     return await HWBTransaction.count({
  //       where: {
  //         dateHWBTransaction: {
  //           [Op.gte]: new Date(new Date() - 2 * 30 * 24 * 60 * 60 * 1000), // 2 mois en millisecondes
  //         },
  //       }, 
  //     });
  //   } catch (error) {
  //     console.error('Error counting HWBTransactions:', error);
  //     throw new Error('Failed to count HWBTransactions');
  //   }
  // }
  async findAll() {
    return await HWBTransaction.findAll({
      attributes: [
        'idHWBTransaction',
        'numHWB',
        'dateHWBTransaction'
        ],
      include: [
        {
          model: TransactionAerienne,
          attributes: [
            'numMWB',        
          ],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: 'clientExp', // alias pour l'agent expéditeur
          attributes: ['nomClient'],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: 'clientDest', // alias pour l'agent destinataire
          attributes: ['nomClient'],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async update(id, HWBTransactionData) {
    const hwbTransaction = await this.findById(id);
    if (hwbTransaction) {
      return await HWBTransaction.update(HWBTransactionData, { where: { idHWBTransaction: id } });    
    }
    return null;
  }
  async delete(id) {
    const hwbTransaction = await this.findById(id);
    if (hwbTransaction) {
      return await HWBTransaction.destroy({where: { idHWBTransaction: id }});
    }
    return null;
  }
}

module.exports = HWBTransactionRepository;
