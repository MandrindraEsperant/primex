const { Op } = require("sequelize");
const TransactionMaritime = require("../models/TransactionMaritime");
const IRepository = require("../interfaces/IRepository");

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
    return await TransactionMaritime.findAll();
  }
  async update(id, TransactionData) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await TransactionMaritime.update(TransactionData,{where: { idTransAerienne: id }});
    }
    return null;
  }

  async delete(id) {
    const Transaction = await this.findById(id);
    if (Transaction) {
      return await Transaction.destroy({ where: { idTransaction: id } });
    }
    return null;
  }
}

module.exports = TransactionMaritimeRepository;
