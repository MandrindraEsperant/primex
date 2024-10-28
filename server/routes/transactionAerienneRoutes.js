const express = require('express');
const TransactionAerienneRepository = require('../repository/TransactionAerienneRepository');
const TransactionAerienneService = require('../services/TransactionAerienneService');
const TransactionAerienneController = require('../controller/TransactionAerienneController');

const router = express.Router(); 

const transactionAerienneRepository = new TransactionAerienneRepository();
const transactionAerienneService = new TransactionAerienneService(transactionAerienneRepository);
const transactionAerienneController = new TransactionAerienneController(transactionAerienneService);

router.post('/', (req, res) => transactionAerienneController.createTransactionAerienne(req, res));
// router.get('/search', (req, res) =>transactionAerienneController.getResultSeach(req, res));
router.get('/', (req, res) => transactionAerienneController.getAllTransactionAeriennes(req, res));
router.get('/:id', (req, res) =>transactionAerienneController.getOneTransactionAerienne(req, res));
router.put('/:id', (req, res) => transactionAerienneController.updateTransactionAerienne(req, res));
router.delete('/:id', (req, res) => transactionAerienneController.deleteTransactionAerienne(req, res));

module.exports = router;
