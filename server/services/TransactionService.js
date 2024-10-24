class TransactionService {
    constructor(transactionRepository) {
      this.transactionRepository = transactionRepository;
    }
    
    async createTransaction(TransactionData) {
      // Validation des données
    //   if (
    //     !TransactionData.nomTransaction || !TransactionData.emailTransaction || !TransactionData.CINTransaction || !TransactionData.creerPar
    //   ) {
    //     throw new Error("Tous les champs sont requis.");
    //   }
      return await this.TransactionRepository.create(TransactionData);
    }

    async getTransactionById(id) {
      return await this.transactionRepository.findById(id);
    }
    async getCountAllTransaction() {
      return await this.transactionRepository.countAll();
    }
    // async searchAll(word) {
    //   return await this.TransactionRepository.searchAll(word);
    // }
    async getAllTransactions() { 
      return await this.transactionRepository.findAll();
    }
  
    async updateTransaction(id, TransactionData) {
      return await this.transactionRepository.update(id, TransactionData);
    }
  
    async deleteTransaction(id) {
      return await this.transactionRepository.delete(id);
    }
  }

  module.exports = TransactionService ;