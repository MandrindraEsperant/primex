
class TransactionAerienneService {
    constructor(TransactionAerienneRepository) {
      this.TransactionAerienneRepository = TransactionAerienneRepository;
    }
    async createTransactionAerienne(Data) {
      // Validation des données 
      if (!Data.numMWB
        || !Data.idTransport
        || !Data.idAgentDest
        || !Data.idAgentExp 
        || !Data.dateEmission
        || !Data.creerPar ) {
        throw new Error("Tous les champs sont requis.");
      }
      return await this.TransactionAerienneRepository.create(Data);
    }
    async getTransactionAerienneById(id) {
      return await this.TransactionAerienneRepository.findById(id);
    }
    async getAllTransactionAeriennes() {
      return await this.TransactionAerienneRepository.findAll(); 
    }
    async updateTransactionAerienne(id, transactionData) {
      return await this.TransactionAerienneRepository.update(id, transactionData);
    }
    async deleteTransactionAerienne(id) {
      return await this.TransactionAerienneRepository.delete(id);
    }
  }
  
  module.exports = TransactionAerienneService;
  