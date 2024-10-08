class ClientService {
    constructor(clientRepository) {
      this.clientRepository = clientRepository;
    }
    
    async createClient(clientData) {
      // Validation des données
      if (
        !clientData.nomClient || !clientData.emailClient || !clientData.CINClient || !clientData.creerPar
      ) {
        throw new Error("Tous les champs sont requis.");
      }
      return await this.clientRepository.create(clientData);
    }

    async getClientById(id) {
      return await this.clientRepository.findById(id);
    }
  
    async getAllClients() { 
      return await this.clientRepository.findAll();
    }
  
    async updateClient(id, clientData) {
      return await this.clientRepository.update(id, clientData);
    }
  
    async deleteClient(id) {
      return await this.clientRepository.delete(id);
    }
  }

  module.exports = ClientService ;