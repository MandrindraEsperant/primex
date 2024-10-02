class ClientController {
    constructor(clientService) {
      this.clientService = clientService;
    }
  
    async createClient(req, res) {
      try {
        const client = await this.clientService.createClient(req.body);
        res.status(201).json(client);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async getClientById(req, res) {
      try {
        const client = await this.clientService.getClientById(req.params.id);
        if (client) {
          res.status(200).json(client);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async getAllClients(req, res) {
      try {
        const clients = await this.clientService.getAllClients();
        res.status(200).json(clients);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async updateClient(req, res) {
      try {
        const client = await this.clientService.updateClient(
          req.params.id,
          req.body
        );
        res.status(200).json(client);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async deleteClient(req, res) {
      try {
        await this.clientService.deleteClient(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = ClientController;