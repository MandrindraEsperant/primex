const HBL = require('../models/HBL');
const IRepository = require('../interfaces/IRepository');
const MBL = require('../models/MBL')
const Client = require('../models/Client');
 
class HBLRepository extends IRepository {
  async create(Data) {
    return await HBL.create(Data);
  }
  async findById(id) {
    return await HBL.findByPk(id);
  }
  async findByNum(num) {
    return await HBL.findOne({
      where:{
        numHBL : num
      },
      attributes: [
        'idHBL',
        'numHBL',
        'dateEmmission',
        'idMBL'
        ],
      include: [
        {
          model: TransactionMaritime,
          attributes: [
            'numMBL',        
          ],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: 'clientExp', // alias pour l'agent expéditeur
          attributes: ['nomClient'],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: 'clientDest', // alias pour l'agent destinataire
          attributes: ['nomClient'],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async findAll() {
    return await HBL.findAll({
      attributes: [
        'idHBL',
        'numHBL',
        'dateHBL'
        ],
      include: [
        {
          model: TransactionMaritime,
          attributes: [
            'numMBL',        
          ],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: 'clientExp', // alias pour l'agent expéditeur
          attributes: ['nomClient'],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: 'clientDest', // alias pour l'agent destinataire
          attributes: ['nomClient'],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async findAllByMaster(id) {
    return await HBL.findAll({
      where:{
        idMBL : id
      },
      attributes: [
        'idHBL',
        'numHBL',
        'dateHBL'
        ],
      include: [
        {
          model: TransactionMaritime,
          attributes: [
            'numMBL',        
          ],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: 'clientExp', // alias pour l'agent expéditeur
          attributes: ['nomClient'],
          required: true, // pour forcer la jointure
        },
        {
          model: Client,
          as: 'clientDest', // alias pour l'agent destinataire
          attributes: ['nomClient'],
          required: true, // pour forcer la jointure
        },
      ],
    });
  }
  async update(id, HBLData) {
    const HBL = await this.findById(id);
    if (HBL) {
      return await HBL.update(HBLData, { where: { idHBL: id } });    
    }
    return null;
  }
  async delete(id) {
    const HBL = await this.findById(id);
    if (HBL) {
      return await HBL.destroy({where: { idHBL: id }});
    }
    return null;
  }
}

module.exports = HBLRepository;
