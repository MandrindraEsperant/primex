const Importation = require('../models/Importation');
const IRepository = require('../interfaces/IRepository');

const { Op } = require('sequelize');   // Importer les opérateurs Sequelize
const moment = require('moment'); 
const twoMonthsAgo = moment().subtract(2, 'months').startOf('month').toDate();
const now = new Date();

class ImportationRepository extends IRepository {
  async create(Data) {
    return await Importation.create(Data);
  }

  async findById(id) {
    return await Importation.findByPk(id);
  }
  async countAll() {
    return await Importation.count(
      {
        where: {
          dateImportation: {
            [Op.gte]: twoMonthsAgo,
            [Op.lt]: now             
          }
        }
      }
    );
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
