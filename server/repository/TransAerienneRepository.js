const TransAerienne = require('../models/TransAerienne');
const IRepository = require('../interfaces/IRepository');

class TransAerienneRepository extends IRepository {
  async create(Data) {
    return await TransAerienne.create(Data);
  }

  async findById(id) {
    return await TransAerienne.findByPk(id);
  }
  
  async findAll() {
    return await TransAerienne.findAll();
  }

  async update(id, transAerienneData) {
    const transAerienne = await this.findById(id);
    if (transAerienne) {
      return await TransAerienne.update(transAerienneData,{where: { idTransAerienne: id }});
    }
    return null;
  }

  async delete(id) {
    const transAerienne = await this.findById(id);
    if (transAerienne) {
      return await TransAerienne.destroy({where: { idTransAerienne: id }});
    }
    return null;
  }
}

module.exports = TransAerienneRepository;
