const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

class EmployeService {
  constructor(employeRepository) {
    this.employeRepository = employeRepository;
  }
  async createEmploye(employeData) {
    // Validation des données
    if (
      !employeData.nomEmploye ||
      !employeData.emailEmploye ||
      !employeData.typeEmploye ||
      !employeData.motDePasse
    ) {
      throw new Error("Tous les champs sont requis.");
    }

    // Vérifier que le mot de passe est assez sécurisé (par exemple, longueur minimale)
    if (employeData.motDePasse.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
    }
    // Cryptage du mot de passe
    const hashedPassword = await bcrypt.hash(
      employeData.motDePasse,
      SALT_ROUNDS
    );
    employeData.motDePasse = hashedPassword;

    return await this.employeRepository.create(employeData);
  }

  async authenticate(emailEmploye, motDePasse) {
    const employe = await this.employeRepository.findByEmail(emailEmploye);
    if (!employe) {
      throw new Error("Utilisateur non trouvé.");
    }

    const isPasswordValid = await bcrypt.compare(
      motDePasse,
      employe.motDePasse
    );
    if (!isPasswordValid) {
      throw new Error("Mot de passe invalide.");
    }

    const token = jwt.sign({ id: employe.id }, SECRET_KEY, { expiresIn: "1h" });
    return { token };
  }

  // *******************************************************

  async getEmployeById(id) {
    return await this.employeRepository.findById(id);
  }

  async getAllEmployes() {
    return await this.employeRepository.findAll();
  }

  async updateEmploye(id, employeData) {
    return await this.employeRepository.update(id, employeData);
  }

  async deleteEmploye(id) {
    return await this.employeRepository.delete(id);
  }
}

module.exports = EmployeService;
