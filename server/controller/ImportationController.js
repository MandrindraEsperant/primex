class ImportationController {
    constructor(ImportationService) {
      this.ImportationService = ImportationService;
    }
  
    async createImportation(req, res) {
      try {
        const Importation = await this.ImportationService.createImportation(req.body);
        res.status(201).json(Importation);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async getOneImportation(req, res) {
      try {
        const Importation = await this.ImportationService.getImportationById(req.params.id);
        if (Importation) {
          res.status(200).json(Importation);
        } else {
          res.status(404).send("Importation not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async getAllImportations(req, res) {
      try {
        const Importations = await this.ImportationService.getAllImportations();        
        res.status(200).json(Importations); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async updateImportation(req, res) {
      try {
        const Importation = await this.ImportationService.updateImportation(
          req.params.id,
          req.body
        );
        res.status(200).json(Importation);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async deleteImportation(req, res) {
      try {
        await this.ImportationService.deleteImportation(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = ImportationController;
  