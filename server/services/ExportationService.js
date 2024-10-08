
class ExportationService {
    constructor(exportationRepository) {
      this.exportationRepository = exportationRepository;
    }
    async createExportation(Data) {
      // Validation des données
      if (!Data.dateExportation || !Data.numMBL || !Data.modeTransport || !Data.idTransport || !Data.creerPar ) {
        throw new Error("Tous les champs sont requis.");
      }
      return await this.exportationRepository.create(Data);
    }
    async getExportationById(id) {
      return await this.exportationRepository.findById(id);
    }
    async getAllExportations() {
      return await this.exportationRepository.findAll(); 
    }
    async updateExportation(id, Data) {
      return await this.exportationRepository.update(id, Data);
    }
    async deleteExportation(id) {
      return await this.exportationRepository.delete(id);
    }
  }
  
  
  module.exports = ExportationService;
  