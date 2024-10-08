
class TransMaritimeService {
  constructor(transMaritimeRepository) {
    this.transMaritimeRepository = transMaritimeRepository;
  }
  async createTransMaritime(Data) {
    // Validation des données 
    if (!Data.numHBL || !Data.numBateau || !Data.nomBateau || !Data.dateDepart || !Data.dateArriver || !Data.creerPar ) {
      throw new Error("Tous les champs sont requis.");
    }

    return await this.transMaritimeRepository.create(Data);
  }
  async getTransMaritimeById(id) {
    return await this.transMaritimeRepository.findById(id);
  }
  async getAllTransMaritimes() {
    return await this.transMaritimeRepository.findAll(); 
  }
  async updateTransMaritime(id, employeData) {
    return await this.transMaritimeRepository.update(id, employeData);
  }
  async deleteTransMaritime(id) {
    return await this.transMaritimeRepository.delete(id);
  }
}


module.exports = TransMaritimeService;
