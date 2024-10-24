class TransactionController {
    constructor(TransactionService) {
      this.TransactionService = TransactionService;
    }
  
    async createTransaction(req, res) {
      try {
        const Transaction = await this.TransactionService.createTransaction(req.body);
        res.status(201).json(Transaction);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          // Gérer l'erreur d'unicité
          res.status(400).json({
            error:
              error.errors[0].message || "Une valeur unique est déjà présente.",
          });
        } else if (error.message) {
          res.status(401).json({ error: error.message });
        } else {
          // Erreur interne serveur
          res.status(500).json({ error: "Erreur lors de la creation du Transaction" });
        }
      }
    }
  
    async getTransactionById(req, res) {
      try {
        const Transaction = await this.TransactionService.getTransactionById(req.params.id);
        if (Transaction) {
          res.status(200).json(Transaction);
        } else {
          res.status(404).send("transaction not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    // async getResultSeach(req, res) {
    //   try {
    //     const Transactions = await this.TransactionService.searchAll(req.query.search);
    //     res.status(200).json(Transactions);
    //   } catch (error) {
    //     res.status(500).send(error.message);
    //   }
    // }
  
    async getAllTransactions(req, res) {
      try {
        const Transactions = await this.TransactionService.getAllTransactions();
        res.status(200).json(Transactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getCountAllTransactions(req, res) {
      try {
        const Transactions = await this.TransactionService.getCountAllTransaction();
        res.status(200).json(Transactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  
    async updateTransaction(req, res) {
      try {
        const Transaction = await this.TransactionService.updateTransaction(
          req.params.id,
          req.body
        );
        res.status(200).json(Transaction);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          // Gérer l'erreur d'unicité
          res.status(400).json({
            error:
              error.errors[0].message || "Une valeur unique est déjà présente.",
          });
        } else if (error.message) {
          res.status(401).json({ error: error.message });
        } else {
          // Erreur interne serveur
          res.status(500).json({ error: "Erreur lors de la creation du Transaction" });
        }
      }
    }
  
    async deleteTransaction(req, res) {
      try {
        await this.TransactionService.deleteTransaction(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = TransactionController;
  