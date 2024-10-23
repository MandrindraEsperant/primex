const Importation = require('../models/Importation');
const IRepository = require('../interfaces/IRepository');

const { Op } = require('sequelize');   // Importer les opérateurs Sequelize

class ImportationRepository extends IRepository {
  async create(Data) {
    return await Importation.create(Data);
  }

  async findById(id) {
    return await Importation.findByPk(id);
  }
  async countAll() {
    try {
      return await Importation.count({
        where: {
          dateImportation: {
            [Op.gte]: new Date(new Date() - 2 * 30 * 24 * 60 * 60 * 1000), // 2 mois en millisecondes
          },
        },
      });
    } catch (error) {
      console.error('Error counting importations:', error);
      throw new Error('Failed to count importations');
    }
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
