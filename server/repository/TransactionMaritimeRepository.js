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
