const MAWB = require("../models/MAWB");
const IRepository = require("../interfaces/IRepository");
const HAWB = require("../models/HAWB");
const Client = require("../models/Client");

class HAWBRepository extends IRepository {
  async create(Data) {
    return await HAWB.create(Data);
  }
  async findById(id) {
    return await HAWB.findByPk(id);
  }
  async findAll() {
    return await HAWB.findAll({
      attributes: ["idHAWB", "numHAWB", "dateEmmission"],
      include: [
        {
          model: HAWB,
          attributes: ["numMAWB"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientExp", // alias pour l'agent expéditeur
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientDest", // alias pour l'agent destinataire
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async findByNum(num) {
    return await HAWB.findOne({
      Where: { numHAWB: num },
      attributes: ["idHAWB", "numHAWB", "dateEmmission", "idMAWB"],
      include: [
        {
          model: MAWB,
          attributes: ["numMAWB"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientExp", // alias pour l'agent expéditeur
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientDest", // alias pour l'agent destinataire
          attributes: ["nomClient"],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }

  async update(id, HAWBData) {
    const HAWB = await this.findById(id);
    if (HAWB) {
      return await HAWB.update(HAWBData, { where: { idHAWB: id } });
    }
    return null;
  }
  async delete(id) {
    const HAWB = await this.findById(id);
    if (HAWB) {
      return await HAWB.destroy({ where: { idHAWB: id } });
    }
    return null;
  }
}

module.exports = HAWBRepository;
