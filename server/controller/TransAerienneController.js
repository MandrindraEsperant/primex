class TransAerienneController {
  constructor(transAerienneService) {
    this.transAerienneService = transAerienneService;
  }
  async createTransAerienne(req, res) {
    try {
      const transAerienne = await this.transAerienneService.createTransAerienne(
        req.body
      );
      res.status(201).json(transAerienne);
    } catch (error) {
      res.status(500).send(error.message);
    }
}
  async getOneTransAerienne(req, res) {
    try {
      const transAerienne =
        await this.transAerienneService.getTransAerienneById(req.params.id);
      if (transAerienne) {
        res.status(200).json(transAerienne);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getAllTransAeriennes(req, res) {
    try {
      const transAeriennes =
        await this.transAerienneService.getAllTransAeriennes();
      res.status(200).json(transAeriennes);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateTransAerienne(req, res) {
    try {
      const transAerienne = await this.transAerienneService.updateTransAerienne(
        req.params.id,
        req.body
      );
      res.status(200).json(transAerienne);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteTransAerienne(req, res) {
    try {
      await this.transAerienneService.deleteTransAerienne(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = TransAerienneController;
