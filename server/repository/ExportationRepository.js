const Exportation = require('../models/Exportation');
const IRepository = require('../interfaces/IRepository');

const { Op } = require('sequelize');
const moment = require('moment'); 
const twoMonthsAgo = moment().subtract(2, 'months').startOf('month').toDate();
const now = new Date();

class ExportationRepository extends IRepository {
  async create(Data) {
    return await Exportation.create(Data);
  }

  async findById(id) {
    return await Exportation.findByPk(id);
  }
  async countAll() {
    return await Exportation.count(
      {
        where: {
          dateExportation: {
            [Op.gte]: twoMonthsAgo,
            [Op.lt]: now            
          }
        }
      }
    );
  }
  
  async findAll() {
    return await Exportation.findAll();
  }

  async update(id, ExportationData) {
    const exportation = await this.findById(id);
    if (exportation) {
      return await Exportation.update(ExportationData, { where: { idExportation: id } });    
    }
    return null;
  }

  async delete(id) {
    const exportation = await this.findById(id);
    if (exportation) {
      return await Exportation.destroy({where: { idExportation: id }});
    }
    return null;
  }
}

module.exports = ExportationRepository;
