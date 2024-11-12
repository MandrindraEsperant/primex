const HBLTransaction = require("../models/HBLTransaction");
const HWBTransaction = require("../models/HWBTransaction");
const TransactionAerienne = require("../models/TransactionAerienne");
const TransactionMaritime = require("../models/TransactionMaritime");
const Agent = require("../models/Agent");
const TransMaritime = require("../models/TransMaritime");
const IRepository = require("../interfaces/IRepository");
const { where } = require("sequelize");

class documentRepository extends IRepository {
  async docMBL(id) {
    return await TransactionMaritime.findAll( {
      where:{
        idTransactionMaritime : id
      },
      attributes: [
        'idTransactionMaritime',
        'numMBL',
        'dateEmission',
        'dateDestination',
      ],
      include: [
        {
          model: TransMaritime,
          attributes: [
            'numIMO',
            'armateur',
            'dateChargement',
            'paysChargement',
            'paysDechargement',
          ],
          required: true, // pour forcer la jointure
        },
        {
          model: Agent,
          as: 'agentExp', // alias pour l'agent expéditeur
          attributes: ['nomAgent'],
          required: true, // pour forcer la jointure
        },
        {
          model: Agent,
          as: 'agentDest', // alias pour l'agent destinataire
          attributes: ['nomAgent'],
          required: true, // pour forcer la jointure
        },
      ],
    })
    //select MBL (transport, transitaire)
      // select HBL (Client) whrere MBL
      // select Marchandise where  HBL 
  }
  async docMWB() {
    return await TransactionAerienne.findAll()
    //select MBL (transport, transitaire)
      // select HBL (Client) whrere MBL
      // select Marchandise where  HBL
  }
 

}

module.exports = documentRepository;
