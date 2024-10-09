
class ImportationService {
    constructor(importationRepository) {
      this.importationRepository = importationRepository;
    }
    async createImportation(Data) {
      // Validation des données
      if (!Data.dateImportation || !Data.numMBL || !Data.modeTransport || !Data.idTransport || !Data.creerPar ) {
        throw new Error("Tous les champs sont requis.");
      }
      return await this.importationRepository.create(Data);
    }

    async getImportationById(id) {
      return await this.importationRepository.findById(id);
    }
    async getAllImportations() {
      return await this.importationRepository.findAll(); 
    }
    async updateImportation(id, Data) {
      return await this.importationRepository.update(id, Data);
    }
    async deleteImportation(id) {
      return await this.importationRepository.delete(id);
    }
  }
  
  
  module.exports = ImportationService;
  