const Client = require('../models/Client')
const IRepository = require('../interfaces/IRepository')

class ClientRepository extends IRepository {

    async create(clientData) {
      return await Client.create(clientData);
    }
  
    async findById(id) {
      return await Client.findByPk(id);
    }
  
    async findByEmail(email) {
      return await Client.findOne({ where: { emailClient: email } });
    }
    
    async findAll() {
      return await Client.findAll();
    }
  
    async update(id, clientData) {
      const client = await this.findById(id);
      if (client) {
        return await client.update(clientData);
      }
      return null;
    }
  
    async delete(id) {
      const client = await this.findById(id);
      if (client) {
        return await employe.destroy();
      }
      return null;
    }
  }