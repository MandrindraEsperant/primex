const Importation = require('../models/Importation');
const IRepository = require('../interfaces/IRepository');

class ImportationRepository extends IRepository {
  async create(Data) {
    return await Importation.create(Data);
  }

  async findById(id) {
    return await Importation.findByPk(id);
  }
  async countAll() {
    return await Importation.count();
  }
  async findAll() {
    return await Importation.findAll();
  }

  async update(id, ImportationData) {
    const importation = await this.findById(id);
    if (importation) {
      return await Importation.update(ImportationData, { where: { idImportation: id } });    
    }
    return null;
  }

  async delete(id) {
    const importation = await this.findById(id);
    if (importation) {
      return await Importation.destroy({where: { idImportation: id }});
    }
    return null;
  }
}

module.exports = ImportationRepository;
