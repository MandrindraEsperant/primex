const TransAerienne = require('../models/TransAerienne');
const IRepository = require('../interfaces/IRepository');

class TransAerienneRepository extends IRepository {
  async create(Data) {
    return await TransAerienne.create(Data);
  }

  async findById(id) {
    return await TransAerienne.findByPk(id);
  }
  async findByNumVol(numVol) {
    return await TransAerienne.findOne({ where: { numVol: numVol } });
  }
  async searchAll(word) {
    return await Client.findAll({
      where: {
        [Op.or]: [
          { numVol: { [Op.like]: `%${word}%` } },
          { nomCompagnie: { [Op.like]: `%${word}%` } },
          { dateDepart: { [Op.like]: `%${word}%` } },
          { dateArriver: { [Op.like]: `%${word}%` } },
        ],
      },
    });
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