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

class ExportationService {
  constructor(exportationRepository) {
    this.exportationRepository = exportationRepository;
  }

  async createExportation(Data) {

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

    return await this.exportationRepository.create(Data);
  }
  async getExportationById(id) {
    return await this.exportationRepository.findById(id);
  }
  async getCountAllExportation() {
    return await this.exportationRepository.countAll();
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
