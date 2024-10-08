const TransMaritime = require('../models/TransMaritime');
const IRepository = require('../interfaces/IRepository');

class TransMaritimeRepository extends IRepository {
  async create(Data) {
    return await TransMaritime.create(Data);
  }

  async findById(id) {
    return await TransMaritime.findByPk(id);
  }
  
  async findAll() {
    return await TransMaritime.findAll();
  }

  async update(id, transMaritimeData) {
    const transMaritime = await this.findById(id);
    if (transMaritime) {
      return await TransMaritime.update(transMaritimeData);
    }
    return null;
  }

  async delete(id) {
    const transMaritime = await this.findById(id);
    if (transMaritime) {
      return await TransMaritime.destroy({where: { idTransMaritime: id }});
    }
    return null;
  }
}

module.exports = TransMaritimeRepository;
