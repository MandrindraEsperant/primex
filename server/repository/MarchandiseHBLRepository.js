const Marchandise = require("../models/MarchandiseHBL");
const IRepository = require("../interfaces/IRepository");
const { Sequelize, literal } = require('sequelize');

class MarchandiseRepository extends IRepository {
  async create(Data) {
    return await Marchandise.create(Data);
  }
  async findById(id) {
    return await Marchandise.findByPk(id);
  }
  async plusExpedier() {
    const totalCount = await Marchandise.count();

    return await Marchandise.findAll({
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
    return await Marchandise.findAll();
  }
  async update(id, MarchandiseData) {
    const marchandise = await this.findById(id);
    if (marchandise) {
      return await Marchandise.update(MarchandiseData, {
        where: { idMarchandiseHBL: id },
      });
    }
    return null;
  }
  async delete(id) {
    const marchandise = await this.findById(id);
    if (marchandise) {
      return await Marchandise.destroy({ where: { idMarchandiseHBL: id } });
    }
    return null;
  }
}

module.exports = MarchandiseRepository;
