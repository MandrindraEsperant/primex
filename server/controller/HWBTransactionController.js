class HWBTransactionController {
    constructor(HWBTransactionService) {
      this.HWBTransactionService = HWBTransactionService;
    }
    async createHWBTransaction(req, res) {
      try {
        const HWBTransaction = await this.HWBTransactionService.createHWBTransaction(
          req.body
        );
        res.status(201).json(HWBTransaction);
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
            res.status(500).json({ error: "Erreur lors de la creation du HWL" });
          }
      }
    }
    async getOneHWBTransaction(req, res) {
      try {
        const HWBTransaction = await this.HWBTransactionService.getHWBTransactionById(
          req.params.id
        );
        if (HWBTransaction) {
          res.status(200).json(HWBTransaction);
        } else {
          res.status(404).send("HWBTransaction not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllHWBTransactions(req, res) {
      try {
        const HWBTransactions = await this.HWBTransactionService.getAllHWBTransactions();
        res.status(200).json(HWBTransactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    // async getCountAllHWBTransaction(req, res) {
    //    try {
    //     const HWBTransactions = await this.HWBTransactionService.getCountAllHWBTransaction();
    //     res.status(200).json(HWBTransactions);
    //   } catch (error) {
    //     res.status(500).send(error.message);
    //   }
    // }
    async updateHWBTransaction(req, res) {
      try {
        const HWBTransaction = await this.HWBTransactionService.updateHWBTransaction(
          req.params.id,
          req.body
        );
        res.status(200).json(HWBTransaction);
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
            res.status(500).json({ error: "Erreur lors de la creation du HWL" });
          }
      }
    }
    async deleteHWBTransaction(req, res) {
      try {
        await this.HWBTransactionService.deleteHWBTransaction(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = HWBTransactionController;
  