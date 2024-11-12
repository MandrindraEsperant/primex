class HouseTransactionService {
  constructor(HouseTransactionRepository) {
    this.HouseTransactionRepository = HouseTransactionRepository;
  }
  async createHouseTransaction(Data) {
    return await this.HouseTransactionRepository.create(Data);
  }
  async getHouseTransactionById(id) {
    return await this.HouseTransactionRepository.findById(id);
  }
  async getHouseTransactionByNum(num) {
    return await this.HouseTransactionRepository.findByNum(num);
  }
  async getAllHouseTransactions() {
    return await this.HouseTransactionRepository.findAll();
  }
  async getAllHouseTransactionsMere(id) {
    return await this.HouseTransactionRepository.findAll_mbl(id);
  }
  async updateHouseTransaction(id, Data) {
    return await this.HouseTransactionRepository.update(id, Data);
  }
  async deleteHouseTransaction(id) {
    return await this.HouseTransactionRepository.delete(id);
  }
}

module.exports = HouseTransactionService;
