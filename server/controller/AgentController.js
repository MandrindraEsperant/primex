class AgentController {
    constructor(AgentService) {
      this.AgentService = AgentService;
    }
    async createAgent(req, res) {
      try {
        const Agent = await this.AgentService.createAgent(req.body);
        res.status(201).json(Agent);
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
    async getAgentById(req, res) {
      try {
        const Agent = await this.AgentService.getAgentById(req.params.id);
        if (Agent) {
          res.status(200).json(Agent);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getResultSeach(req, res) {
      try {
        const Agents = await this.AgentService.searchAll(req.query.search);
        res.status(200).json(Agents);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getAllAgents(req, res) {
      try {
        const Agents = await this.AgentService.getAllAgents();
        res.status(200).json(Agents);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async getCountAllAgents(req, res) {
      try {
        const Agents = await this.AgentService.getCountAllAgent();
        res.status(200).json(Agents);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    async updateAgent(req, res) {
      try {
        const Agent = await this.AgentService.updateAgent(
          req.params.id,
          req.body
        );
        res.status(200).json(Agent);
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
    async deleteAgent(req, res) {
      try {
        await this.AgentService.deleteAgent(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
  
  module.exports = AgentController;
  