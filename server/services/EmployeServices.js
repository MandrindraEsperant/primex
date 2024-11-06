const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
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
        throw new Error("Utilisateur non trouvé");
      }
      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(
        motDePasse,
        employe.motDePasse
      );
      if (!isPasswordValid) {
        throw new Error("Mot de passe invalide");
      }
      const token = jwt.sign(
        { id: employe.idEmployer, nom: employe.nomEmploye },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return { token };
    } catch (error) {
      throw error;
    }
  }
  async forgotPwd(email) {
    const user = await this.employeRepository.findByEmail(email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    const temporaryCode = crypto.randomBytes(3).toString("hex");

    // Générer un token JWT avec le code temporaire qui expire dans 10 minutes
    const token = jwt.sign({ id: user.idEmployer, temporaryCode }, SECRET_KEY, {
      expiresIn: "10m",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Votre code d'accès temporaire",
      text: `Votre code d'accès temporaire est : ${temporaryCode}`,
    };

    await transporter.sendMail(mailOptions);
    return { token };
  }
  async resetPwd(token,newPassword,email,codeTemp) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);      
      
      if (decoded.temporaryCode !=codeTemp) {
        throw new Error('Code de réinitialisation incorrect.')
      }
      // Réinitialise le mot de passe
      const verification = await this.employeRepository.findByEmailAndId(email,decoded.id)
      if(!verification){
        throw new Error("Employé non trouvé")
      }
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const employeData = { motDePasse:hashedPassword  }
      return await this.employeRepository.update(decoded.id, employeData);
    } catch (error) {
      throw error;
    }
    
  
  }
  async getEmployeById(id) {
    return await this.employeRepository.findById(id);
  }
  async getAllEmployes() {
    return await this.employeRepository.findAll();
  }
  async updateEmploye(id, employeData) {
    if (employeData.newPwd!="" && employeData.oldPwd!="") {
      const verification = await this.getEmployeById(id);

      const isPasswordValid = await bcrypt.compare(
        employeData.oldPwd,
        verification.motDePasse
      );
      if (!isPasswordValid) {
        throw new Error("Mot de passe invalide");
      }
      employeData.motDePasse = employeData.newPwd;
    }
    const hashedPassword = await bcrypt.hash(
      employeData.motDePasse,
      SALT_ROUNDS
    );
    employeData.motDePasse = hashedPassword;
    return await this.employeRepository.update(id, employeData);
  }
    async deleteEmploye(id) {
    return await this.employeRepository.delete(id);
  }
}

module.exports = EmployeService;
