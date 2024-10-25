const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');

const agentRoutes = require('./routes/agentRoutes');
const employeRoutes = require('./routes/employeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const exportationRoutes = require('./routes/exportationRoutes');
const importationRoutes = require('./routes/importationRoutes');
const marchandiseRoutes = require('./routes/marchandiseRoutes');
const hblTransactionRoutes = require('./routes/hblTransactionRoutes');
const hwbTransactionRoutes = require('./routes/hwbTransactionRoutes');
const transAerienneRoutes = require('./routes/transAerienneRoutes');
const transMaritimeRoutes = require('./routes/transMaritimeRoutes');
const transactionMaritimeRoutes = require('./routes/transactionMaritimeRoutes');
const transactionAerienneRoutes = require('./routes/transactionAerienneRoutes');

const app = express();


app.use(express.json());
app.use(cors())

// Log des requêtes entrantes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}); 

app.use('/agent', agentRoutes);  
app.use('/employe', employeRoutes);
app.use('/client', clientRoutes); 
app.use('/exportation', exportationRoutes);  
app.use('/importation', importationRoutes);  
app.use('/marchandise', marchandiseRoutes);  
app.use('/hblTransaction', hblTransactionRoutes);  
app.use('/hwbTransaction', hwbTransactionRoutes);  
app.use('/transMaritime', transMaritimeRoutes); 
app.use('/transAerienne', transAerienneRoutes);
app.use('/transactionMaritime', transactionMaritimeRoutes);  
app.use('/transactionAerienne', transactionAerienneRoutes);  

// Synchroniser la base de données sans supprimer les tables existantes
sequelize.sync({ force: false, alter:true }) 
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database', err));

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // Affiche l'erreur dans la console
  res.status(500).json({ message: 'Something broke!', error: err.message }); // Renvoie l'erreur dans la réponse
});

module.exports = app;
