const express = require('express');
const TransactionRepository = require('../repository/TransactionRepository');
const TransactionService = require('../services/TransactionService');
const TransactionController = require('../controller/TransactionController');

const router = express.Router(); 

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

router.post('/', (req, res) => transactionController.createTransaction(req, res));
router.get('/search', (req, res) =>transactionController.getResultSeach(req, res)); 
router.get('/all/', (req, res) =>transactionController.getCountAllTransactions(req, res)); 
router.get('/', (req, res) => transactionController.getAllTransactions(req, res));
router.get('/:id', (req, res) =>transactionController.getTransactionById(req, res));
router.put('/:id', (req, res) => transactionController.updateTransaction(req, res));
router.delete('/:id', (req, res) => transactionController.deleteTransaction(req, res));

module.exports = router;