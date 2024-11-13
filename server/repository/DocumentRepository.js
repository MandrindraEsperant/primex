const MBL = require("../models/MBL");
const MAWB = require("../models/MAWB");
const TransMaritime = require("../models/TransMaritime");

class documentRepository {
  async docMBL(id) {
    return await MAWB.findAll( {
      where:{
        idMAWB : id
      },
      attributes: [
        'idMAWB',
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
        }
      ],
    })  
  }
  async docMWB() {
    return await MBL.findAll()
    //select MBL (transport, transitaire)
      // select HBL (Client) whrere MBL
      // select Marchandise where  HBL
  }
 

}

module.exports = documentRepository;
