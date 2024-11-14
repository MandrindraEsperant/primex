const HBL = require("../models/HBL");
const MBL = require("../models/MBL");
const Client = require("../models/Client");
const { fn, col } = require("sequelize");

class HBLRepository  {
  async create(Data) {
    return await HBL.create(Data);
  }
  async findById(id) {
    return await HBL.findByPk(id);
  }
  async findAll() {
    return await HBL.findAll({
      attributes: ["idHBL", "numHBL", "dateEmmission", "idMBL"],
      include: [
        {
          model: MBL,
          attributes: ["idMBL","numMBL"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientExp", // alias pour l'agent expéditeur
          attributes: ["idClient","nomClient"],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: "clientDest", // alias pour l'agent destinataire
          attributes: ["idClient","nomClient"],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async findByNum(num) {
    return await HBL.findOne({
      where: {
        numHBL: num,
      },
      attributes: ["idHBL", "numHBL", "dateEmmission", "idMBL"],
      include: [
        {
          model: MBL,
          attributes: ["numMBL"],
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
  async findAllByMaster(id) {
    return await HBL.findAll({
      where: {
        idMBL: id,
      },
      attributes: ["idHBL", "numHBL", "dateEmmission","nbColis","poid","volume"],
      include: [
        {
          model: MBL,
          attributes: ["numMBL"],
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
  async totalColis(id) {
    return await HBL.findAll({
      where: {
        idMBL: id,
      },
      attributes: [
        [fn("SUM", col("nbColis")), "totalNbColis"],
        [fn("SUM", col("poid")), "totalPoid"],
        [fn("SUM", col("volume")), "totalVolume"],
      ],
    });
  }
  async update(id, HBLData) {
    const hBL = await this.findById(id);
    if (hBL) {
      return await HBL.update(HBLData, { where: { idHBL: id } });
    }
    return null;
  }
  async delete(id) {
    const hBL = await this.findById(id);
    if (hBL) {
      return await HBL.destroy({ where: { idHBL: id } });
    }
    return null;
  }
}

module.exports = HBLRepository;
