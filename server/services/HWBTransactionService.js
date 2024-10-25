// const ClientService = require("./ClientService");
// const ClientRepository = require("../repository/ClientRepository");

// const clientRepository = new ClientRepository();
// const clientService = new ClientService(clientRepository);

class HWBTransactionService {
    constructor(HWBTransactionRepository) {
      this.HWBTransactionRepository = HWBTransactionRepository;
    }
    async createHWBTransaction(Data) {
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
  
      return await this.HWBTransactionRepository.create(Data);
    }
    async getHWBTransactionById(id) {
      return await this.HWBTransactionRepository.findById(id);
    }
  //   async getCountAllHWBTransaction() {
  //     return await this.HWBTransactionRepository.countAll();
  //   }
    async getAllHWBTransactions() {
      return await this.HWBTransactionRepository.findAll();
    }
    async updateHWBTransaction(id, Data) {
      return await this.HWBTransactionRepository.update(id, Data);
    }
    async deleteHWBTransaction(id) {
      return await this.HWBTransactionRepository.delete(id);
    }
  }
  
  module.exports = HWBTransactionService;
  