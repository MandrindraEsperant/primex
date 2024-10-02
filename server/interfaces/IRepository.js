class IEmployeRepository {
     async create(entity) {
      throw new Error('Not implemented');
    }
  
    async findById(id) {
      throw new Error('Not implemented');
    }

    async findAll() {
      throw new Error('Not implemented');
    }
  
    async update(id, entity) {
      throw new Error('Not implemented');
    }
  
    async delete(id) {
      throw new Error('Not implemented');
    }
    async findByEmail(email) {
      throw new Error('Method not implemented.');
    }
  }
  
  module.exports = IEmployeRepository;
  