class MarchandiseController {
    constructor(MarchandiseService) {
      this.MarchandiseService = MarchandiseService;
    }
    async createMarchandise(req, res) {
      try {
        const Marchandise = await this.MarchandiseService.createMarchandise(req.body);
        res.status(201).json(Marchandise);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getOneMarchandise(req, res) {
      try {
        const Marchandise = await this.MarchandiseService.getMarchandiseById(req.params.id);
        if (Marchandise) {
          res.status(200).json(Marchandise);
        } else {
          res.status(404).send("Marchandise not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllMarchandises(req, res) {
      try {
        const Marchandises = await this.MarchandiseService.getAllMarchandises();        
        res.status(200).json(Marchandises); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    } 
    async updateMarchandise(req, res) {
      try {
        const Marchandise = await this.MarchandiseService.updateMarchandise(
          req.params.id,
          req.body
        );
        res.status(200).json(Marchandise);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async deleteMarchandise(req, res) {
      try {
        await this.MarchandiseService.deleteMarchandise(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = MarchandiseController;
  