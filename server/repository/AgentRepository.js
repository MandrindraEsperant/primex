const { Op } = require("sequelize");
const Agent = require("../models/Agent");
const IRepository = require("../interfaces/IRepository");

class AgentRepository extends IRepository {
  async create(AgentData) {
    return await Agent.create(AgentData);
  }
  async countAll() {
    return await Agent.count();
  }
  async findById(id) {
    return await Agent.findByPk(id);
  }
  async findAll() {
    return await Agent.findAll();
  }
  async searchAll(word) {
    return await Agent.findAll({
      where: {
        [Op.or]: [
          { nomAgent: { [Op.like]: `%${word}%` } },
          { paysAgent: { [Op.like]: `%${word}%` } },
          { adresseAgent: { [Op.like]: `%${word}%` } },
          { contactAgent: { [Op.like]: `%${word}%` } },
        ],
      },
    });
  }
  async update(id, AgentData) {
    const agent = await this.findById(id);
    if (agent) {
      return await Agent.update(AgentData,{where:{idAgent:id}});
    }
    return null;
  }
  async delete(id) {
    const agent = await this.findById(id);
    if (agent) {
      return await Agent.destroy({ where: { idAgent: id } });
    }
    return null;
  }
}

module.exports = AgentRepository;
