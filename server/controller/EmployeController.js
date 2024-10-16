class EmployeController {
  constructor(employeService) {
    this.employeService = employeService;
  }

  async createEmploye(req, res) {
    try {
      const employe = await this.employeService.createEmploye(req.body);
      res.status(201).json(employe);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async authentification(req, res) {
    try {
      const { email, password } = req.body;
      const { token } = await this.employeService.authenticate(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error.message) {
        res.status(401).json({ error: error.message });
      } else {
        // Erreur interne serveur
        res.status(500).json({ error: "Erreur lors de l'authentification" });
      }
    }
  }

  async getEmploye(req, res) {
    try {
      const employe = await this.employeService.getEmployeById(req.params.id);
      if (employe) {
        res.status(200).json(employe);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllEmployes(req, res) {
    try {
      const employes = await this.employeService.getAllEmployes();
      res.status(200).json(employes);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateEmploye(req, res) {
    try {
      const employe = await this.employeService.updateEmploye(
        req.params.id,
        req.body
      );
      res.status(200).json(employe);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteEmploye(req, res) {
    try {
      await this.employeService.deleteEmploye(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = EmployeController;
