// const ClientService = require("./ClientService");
// const ClientRepository = require("../repository/ClientRepository");

// const clientRepository = new ClientRepository();
// const clientService = new ClientService(clientRepository);

class HBLTransactionService {
  constructor(HBLTransactionRepository) {
    this.HBLTransactionRepository = HBLTransactionRepository;
  }
  async createHBLTransaction(Data) {
    // Verification de client expediteur et destinataire
//     if(!Data.destinataireData  ){
//       throw new Error("  destinateur requis");
//     }else if(!Data.expediteurData){
//       throw new Error("  expediteur requis");
//     }
//   let  idDestinataire = await clientService.getOrCreateClient(Data.destinataireData);
//   let  idExpediteur = await clientService.getOrCreateClient(Data.expediteurData);
//     Data["idDestinataire"] = idDestinataire;
//     Data["idExpediteur"] = idExpediteur;
//     delete Data["destinataireData"];
//     delete Data["expediteurData"];

    return await this.HBLTransactionRepository.create(Data);
  }
  async getHBLTransactionById(id) {
    return await this.HBLTransactionRepository.findById(id);
  }
//   async getCountAllHBLTransaction() {
//     return await this.HBLTransactionRepository.countAll();
//   }
  async getAllHBLTransactions() {
    return await this.HBLTransactionRepository.findAll();
  }
  async updateHBLTransaction(id, Data) {
    return await this.HBLTransactionRepository.update(id, Data);
  }
  async deleteHBLTransaction(id) {
    return await this.HBLTransactionRepository.delete(id);
  }
}

module.exports = HBLTransactionService;
