class TransMaritimeController {
    constructor(transMaritimeService) {
      this.transMaritimeService = transMaritimeService;
    }
  
    async createTransMaritime(req, res) {
      try {
        const transMaritime = await this.transMaritimeService.createTransMaritime(req.body);
        res.status(201).json(transMaritime);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async getOneTransMaritime(req, res) {
      try {
        const transMaritime = await this.transMaritimeService.getTransMaritimeById(req.params.id);
        if (transMaritime) {
          res.status(200).json(transMaritime);
        } else {
          res.status(404).send("Transport maritime not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async getAllTransMaritimes(req, res) {
      try {
        const transMaritimes = await this.transMaritimeService.getAllTransMaritimes();
        console.log('getALL');
        
        res.status(200).json(transMaritimes); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async updateTransMaritime(req, res) {
      try {
        const transMaritime = await this.transMaritimeService.updateTransMaritime(
          req.params.id,
          req.body
        );
        res.status(200).json(transMaritime);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async deleteTransMaritime(req, res) {
      try {
        await this.transMaritimeService.deleteTransMaritime(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = TransMaritimeController;
  