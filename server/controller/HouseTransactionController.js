class HouseTransactionController {
    constructor(HouseTransactionService) {
      this.HouseTransactionService = HouseTransactionService;
    }
    async createHouseTransaction(req, res) {
      try {
        const HouseTransaction = await this.HouseTransactionService.createHouseTransaction(
          req.body
        );
        res.status(201).json(HouseTransaction);
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
            res.status(500).json({ error: "Erreur lors de la creation du House" });
          }
      }
    }
    async getOneHouseTransaction(req, res) {
      try {
        const HouseTransaction = await this.HouseTransactionService.getHouseTransactionById(
          req.params.id
        );
        if (HouseTransaction) {
          res.status(200).json(HouseTransaction);
        } else {
          res.status(404).send("HouseTransaction not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllHouseTransactions(req, res) {
      try {
        const HouseTransactions = await this.HouseTransactionService.getAllHouseTransactions();
        res.status(200).json(HouseTransactions);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async updateHouseTransaction(req, res) {
      try {
        const HouseTransaction = await this.HouseTransactionService.updateHouseTransaction(
          req.params.id,
          req.body
        );
        res.status(200).json(HouseTransaction);
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
            res.status(500).json({ error: "Erreur lors de la creation du House" });
          }
      }
    }
    async deleteHouseTransaction(req, res) {
      try {
        await this.HouseTransactionService.deleteHouseTransaction(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = HouseTransactionController;
  