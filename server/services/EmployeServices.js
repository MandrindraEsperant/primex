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
    try {
      // Vérification si l'utilisateur existe dans la base de données
      const employe = await this.employeRepository.findByEmail(emailEmploye);
      if (!employe) {

        const erreur = "Utilisateur non trouvé.";
        return {erreur}
      }
  
      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(motDePasse, employe.motDePasse);
      if (!isPasswordValid) {
        // const erreur = "Mot de passe invalide."
        return {'erreur': "Mot de passe invalide."};
      }
  
      // Génération du token JWT avec un temps d'expiration de 1 heure
      const token = jwt.sign({ id: employe.idEmployer, nom : employe.nomEmploye }, SECRET_KEY, { expiresIn: "1h" });
  
      return { token };
    } catch (error) {
      // Gestion de toutes les erreurs et renvoi d'un message approprié
      throw new Error(error.message || "Erreur lors de l'authentification.");
    }
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
