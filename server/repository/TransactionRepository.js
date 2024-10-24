const { Op } = require("sequelize");
const Transaction = require("../models/Transaction");
const IRepository = require("../interfaces/IRepository");

class TransactionRepository extends IRepository {
  async create(TransactionData) {
    return await Transaction.create(TransactionData);
  }
  async countAll() {
    return await Transaction.count();
  }
  async findById(id) {
    return await Transaction.findByPk(id);
  }
  async findByMBL(mbl) {
    return await Transaction.findOne({ where: { numMBL: mbl } });
  }
  async findAll() {
    return await Transaction.findAll();
  }
  
//   async searchAll(word) {
//     return await Transaction.findAll({
//       where: {
//         [Op.or]: [
//           { nomTransaction: { [Op.like]: `%${word}%` } },
//           { emailTransaction: { [Op.like]: `%${word}%` } },
//           { CINTransaction: { [Op.like]: `%${word}%` } },
//         ],
//       },
//     });
//   }

  async update(id, TransactionData) {
    const transaction = await this.findById(id);
    if (transaction) {
      return await Transaction.update(TransactionData);
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

module.exports = TransactionRepository;
