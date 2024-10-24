class TransactionAerienneController {
    constructor(TransactionAerienneService) {
      this.TransactionAerienneService = TransactionAerienneService;
    }
    async createTransactionAerienne(req, res) {
      try {
        const TransactionAerienne = await this.TransactionAerienneService.createTransactionAerienne(req.body);
        res.status(201).json(TransactionAerienne);
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
          res.status(500).json({ error: "Erreur lors de la creation du transaction aerienne" });
        }
      }
    }
    async getOneTransactionAerienne(req, res) {
      try {
        const TransactionAerienne = await this.TransactionAerienneService.getTransactionAerienneById(req.params.id);
        if (TransactionAerienne) {
          res.status(200).json(TransactionAerienne);
        } else {
          res.status(404).send("Transaction aerienne not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllTransactionAeriennes(req, res) {
      try {
        const TransactionAeriennes = await this.TransactionAerienneService.getAllTransactionAeriennes();
        res.status(200).json(TransactionAeriennes); 
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async updateTransactionAerienne(req, res) {
      try {
        const TransactionAerienne = await this.TransactionAerienneService.updateTransactionAerienne(
          req.params.id,
          req.body
        );
        res.status(200).json(TransactionAerienne);
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
    async deleteTransactionAerienne(req, res) {
      try {
        await this.TransactionAerienneService.deleteTransactionAerienne(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = TransactionAerienneController;
  