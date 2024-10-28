const HBLTransaction = require('../models/HBLTransaction');
const IRepository = require('../interfaces/IRepository');

// const { Op } = require('sequelize');

class HBLTransactionRepository extends IRepository {
  async create(Data) {
    return await HBLTransaction.create(Data);
  }
  async findById(id) {
    return await HBLTransaction.findByPk(id);
  }
  // async countAll() {
  //   try {
  //     return await HBLTransaction.count({
  //       where: {
  //         dateHBLTransaction: {
  //           [Op.gte]: new Date(new Date() - 2 * 30 * 24 * 60 * 60 * 1000), // 2 mois en millisecondes
  //         },
  //       }, 
  //     });
  //   } catch (error) {
  //     console.error('Error counting HBLTransactions:', error);
  //     throw new Error('Failed to count HBLTransactions');
  //   }
  // }
  async findAll() {
    return await HBLTransaction.findAll();
  }
  async update(id, HBLTransactionData) {
    const hblTransaction = await this.findById(id);
    if (hblTransaction) {
      return await HBLTransaction.update(HBLTransactionData, { where: { idHBLTransaction: id } });    
    }
    return null;
  }
  async delete(id) {
    const hblTransaction = await this.findById(id);
    if (hblTransaction) {
      return await HBLTransaction.destroy({where: { idHBLTransaction: id }});
    }
    return null;
  }
}

module.exports = HBLTransactionRepository;
