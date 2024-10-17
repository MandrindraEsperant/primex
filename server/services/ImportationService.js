const TransAerienneService = require("./TransAerienneService");
const TransMaritimeService = require("./TransMaritimeService");
const ClientService = require("./ClientService");
const TransMaritimeRepository = require("../repository/TransMaritimeRepository");
const TransAerienneRepository = require("../repository/TransMaritimeRepository");
const ClientRepository = require("../repository/ClientRepository");

const transMaritimeRepository = new TransMaritimeRepository();
const transMaritimeService = new TransMaritimeService(transMaritimeRepository);

const transAerienneRepository = new TransAerienneRepository();
const transAerienneService = new TransAerienneService(transAerienneRepository);

const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);

class ImportationService {
  constructor(importationRepository) {
    this.importationRepository = importationRepository;
  }
  async createImportation(Data) {
    // Verification du transport
    let idTransport;
    if (Data.modeTransport === "Maritime") {
      idTransport = await transMaritimeService.getOrCreateTransport(Data.transportData);
    } else if (Data.modeTransport === "Aerienne") {
      idTransport = await transAerienneService.getOrCreateTransport(Data.transportData);
    } else {
      throw new Error("Mode de transport invalide.");
    }
    delete Data["transportData"];
    Data["idTransport"] = idTransport;
 
     // Verification de client expediteur et destinataire
     if(!Data.destinataireData  ){
      throw new Error("  destinateur requis");
    }else if(!Data.expediteurData){
      throw new Error("  expediteur requis");
    }
  let  idDestinataire = await clientService.getOrCreateClient(Data.destinataireData);
  let  idExpediteur = await clientService.getOrCreateClient(Data.expediteurData);
    Data["idDestinataire"] = idDestinataire;
    Data["idExpediteur"] = idExpediteur;
    delete Data["destinataireData"];
    delete Data["expediteurData"];

    if (
      !Data.dateImportation ||
      !Data.numMBL ||
      !Data.modeTransport ||
      !Data.idTransport ||
      !Data.creerPar
    ) {
      throw new Error("Tous les champs sont requis.");
    }
    return await this.importationRepository.create(Data);
  }

  async getImportationById(id) {
    return await this.importationRepository.findById(id);
  }
  async getCountAllImportation() {
    return await this.importationRepository.countAll();
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
