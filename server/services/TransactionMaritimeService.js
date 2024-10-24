
class TransactionMaritimeService {
    constructor(TransactionMaritimeRepository) {
      this.TransactionMaritimeRepository = TransactionMaritimeRepository;
    }
    async createTransactionMaritime(Data) {
      // Validation des données 
      if (!Data.numMBL
        || !Data.idTransport
        || !Data.idAgentDest
        || !Data.idAgentExp 
        || !Data.dateEmission
        || !Data.creerPar ) {
        throw new Error("Tous les champs sont requis.");
      }
      return await this.TransactionMaritimeRepository.create(Data);
    }
    async getOrCreateTransport(transportData){
      if (!Data.numIMO
        || !Data.nomNavire 
        || !Data.dateChargement 
        || !Data.paysChargement 
        || !Data.villeChargement 
        || !Data.paysDechargement
        || !Data.creerPar ) {
        throw new Error("Tous les champs sont requis.");
      }
  
      let transport = await this.TransactionMaritimeRepository.findByNumIMO(transportData.numIMO);
      if (!transport) {
        transport = await this.TransactionMaritimeRepository.create(transportData);
      }
      // Retourner l'ID du transport
      return transport.idTransactionMaritime;
    };
    async getTransactionMaritimeById(id) {
      return await this.TransactionMaritimeRepository.findById(id);
    }
    async getAllTransactionMaritimes() {
      return await this.TransactionMaritimeRepository.findAll(); 
    }
    async updateTransactionMaritime(id, transactionData) {
      return await this.TransactionMaritimeRepository.update(id, transactionData);
    }
    async deleteTransactionMaritime(id) {
      return await this.TransactionMaritimeRepository.delete(id);
    }
  }
  
  module.exports = TransactionMaritimeService;
  