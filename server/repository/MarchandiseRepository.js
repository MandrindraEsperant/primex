const Marchandise = require('../models/Marchandise');
const IRepository = require('../interfaces/IRepository');

class MarchandiseRepository extends IRepository {
  async create(Data) {
    return await Marchandise.create(Data);
  }
  async findById(id) {
    return await Marchandise.findByPk(id);
  }
  async findAll() {
    return await Marchandise.findAll();
  }
  async update(id, MarchandiseData) {
    const marchandise = await this.findById(id);
    if (marchandise) {
      return await Marchandise.update(MarchandiseData, { where: { idMarchandise: id } });    
    }
    return null;
  }
  async delete(id) {
    const marchandise = await this.findById(id);
    if (marchandise) {
      return await Marchandise.destroy({where: { idMarchandise: id }});
    }
    return null;
  }
}

module.exports = MarchandiseRepository;
