const Suivi = require("../models/SuiviHWB");
const IRepository = require("../interfaces/IRepository");
const { Sequelize, literal } = require('sequelize');

class SuiviRepository extends IRepository {
  async create(Data) {
    return await Suivi.create(Data);
  }
  async findById(id) {
    return await Suivi.findByPk(id);
  }
  async plusExpedier() {
    const totalCount = await Suivi.count();

    return await Suivi.findAll({
      attributes: [
        "nature",
        [Sequelize.fn("COUNT", Sequelize.col("nature")), "nb"],
        [literal(`(COUNT(nature) / ${totalCount} * 100)`), 'pourcentage']
      ],
      group: "nature",
      order: [[Sequelize.literal("nb"), "DESC"]],
      limit: 5, // LIMIT 5
    });
  }
  async findAll() {
    return await Suivi.findAll();
  }
  async update(id, SuiviData) {
    const suivi = await this.findById(id);
    if (suivi) {
      return await Suivi.update(SuiviData, {
        where: { idSuiviHWB: id },
      });
    }
    return null;
  }
  async delete(id) {
    const Suivi = await this.findById(id);
    if (Suivi) {
      return await Suivi.destroy({ where: { idSuiviHWB: id } });
    }
    return null;
  }
}

module.exports = SuiviRepository;
