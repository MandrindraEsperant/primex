class TransAerienneService {
  constructor(transAerienneRepository) {
    this.transAerienneRepository = transAerienneRepository;
  }
  async createTransAerienne(Data) {
    // Validation des données
    if (
      !Data.numVol ||
      !Data.nomCompagnie ||
      !Data.dateDepart ||
      !Data.dateArriver ||
      !Data.creerPar
    ) {
      throw new Error("Tous les champs sont requis.");
    }
    return await this.transAerienneRepository.create(Data);
  }

  async searchAll(word) {
    return await this.transAerienneRepository.searchAll(word);
  }
  
  async getOrCreateTransport(transportData){
    let transport = await this.transAerienneRepository.findByNumVol(transportData.numVol);
    if (!transport) {
      transport = await this.transAerienneRepository.create(transportData);
    }
    // Retourner l'ID du transport
    return transport.idTransAerienne;
  };


  async getTransAerienneById(id) {
    return await this.transAerienneRepository.findById(id);
  }
  async getAllTransAeriennes() {
    return await this.transAerienneRepository.findAll();
  }
  async updateTransAerienne(id, employeData) {
    return await this.transAerienneRepository.update(id, employeData);
  }
  async deleteTransAerienne(id) {
    return await this.transAerienneRepository.delete(id);
  }
}

module.exports = TransAerienneService;
