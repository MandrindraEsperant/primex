class HBLTransactionController {
    constructor(HBLTransactionService) {
      this.HBLTransactionService = HBLTransactionService;
    }
    async createHBLTransaction(req, res) {
      try {
        const HBLTransaction = await this.HBLTransactionService.createHBLTransaction(
          req.body
        );
        res.status(201).json(HBLTransaction);
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
            res.status(500).json({ error: "Erreur lors de la creation du HBL" });
          }
      }
    }
    async getOneHBLTransaction(req, res) {
      try {
        const HBLTransaction = await this.HBLTransactionService.getHBLTransactionById(
          req.params.id
        );
        if (HBLTransaction) {
          res.status(200).json(HBLTransaction);
        } else {
          res.status(404).send("HBLTransaction not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllHBLTransactions(req, res) {
      try {
        const HBLTransactions = await this.HBLTransactionService.getAllHBLTransactions();
        res.status(200).json(HBLTransactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    // async getCountAllHBLTransaction(req, res) {
    //    try {
    //     const HBLTransactions = await this.HBLTransactionService.getCountAllHBLTransaction();
    //     res.status(200).json(HBLTransactions);
    //   } catch (error) {
    //     res.status(500).send(error.message);
    //   }
    // }
    async updateHBLTransaction(req, res) {
      try {
        const HBLTransaction = await this.HBLTransactionService.updateHBLTransaction(
          req.params.id,
          req.body
        );
        res.status(200).json(HBLTransaction);
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
            res.status(500).json({ error: "Erreur lors de la creation du Agent" });
          }
      }
    }
    async deleteHBLTransaction(req, res) {
      try {
        await this.HBLTransactionService.deleteHBLTransaction(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = HBLTransactionController;
  