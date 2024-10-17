class ExportationController {
  constructor(exportationService) {
    this.exportationService = exportationService;
  }

  async createExportation(req, res) {
    try {
      const exportation = await this.exportationService.createExportation(
        req.body
      );
      res.status(201).json(exportation);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOneExportation(req, res) {
    try {
      const Exportation = await this.exportationService.getExportationById(
        req.params.id
      );
      if (Exportation) {
        res.status(200).json(Exportation);
      } else {
        res.status(404).send("Exportation not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllExportations(req, res) {
    try {
      const Exportations = await this.exportationService.getAllExportations();
      res.status(200).json(Exportations);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getCountAllExportation(req, res) {
     try {
      const Exportations = await this.exportationService.getCountAllExportation();
      res.status(200).json(Exportations);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async updateExportation(req, res) {
    try {
      const Exportation = await this.exportationService.updateExportation(
        req.params.id,
        req.body
      );
      res.status(200).json(Exportation);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteExportation(req, res) {
    try {
      await this.exportationService.deleteExportation(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = ExportationController;
