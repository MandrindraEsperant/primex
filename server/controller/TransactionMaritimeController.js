class TransactionMaritimeController {
    constructor(TransactionMaritimeService) {
      this.TransactionMaritimeService = TransactionMaritimeService;
    }
    async createTransactionMaritime(req, res) {
      try {
        const transactionMaritime = await this.TransactionMaritimeService.createTransactionMaritime(req.body);
        res.status(201).json(transactionMaritime);
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
          res.status(500).json({ error: "Erreur lors de la creation du transport maritime" });
        }
      }
    }
    async getOneTransactionMaritime(req, res) {
      try {
        const TransactionMaritime = await this.TransactionMaritimeService.getTransactionMaritimeById(req.params.id);
        if (TransactionMaritime) {
          res.status(200).json(TransactionMaritime);
        } else {
          res.status(404).send("Transport maritime not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllTransactionMaritimes(req, res) {
      try {
        const TransactionMaritimes = await this.TransactionMaritimeService.getAllTransactionMaritimes();
        res.status(200).json(TransactionMaritimes); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async updateTransactionMaritime(req, res) {
      try {
        const TransactionMaritime = await this.TransactionMaritimeService.updateTransactionMaritime(
          req.params.id,
          req.body
        );
        res.status(200).json(TransactionMaritime);
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
          res.status(500).json({ error: "Erreur lors de la creation du Transport maritime" });
        }
      }
    }
    async deleteTransactionMaritime(req, res) {
      try {
        await this.TransactionMaritimeService.deleteTransactionMaritime(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = TransactionMaritimeController;
  