const Employe = require('../models/Employe');

const IEmployeRepository = require('../interfaces/IEmployeRepository');

class EmployeRepository extends IEmployeRepository {

  async create(employeData) {
    return await Employe.create(employeData);
  }

  async findById(id) {
    return await Employe.findByPk(id);
  }

  async findByEmail(email) {
    return await Employe.findOne({ where: { emailEmploye: email } });
  }
  
  async findAll() {
    return await Employe.findAll();
  }

  async update(id, employeData) {
    const employe = await this.findById(id);
    if (employe) {
      return await employe.update(employeData);
    }
    return null;
  }

  async delete(id) {
    const employe = await this.findById(id);
    if (employe) {
      return await employe.destroy();
    }
    return null;
  }
}

module.exports = EmployeRepository;
