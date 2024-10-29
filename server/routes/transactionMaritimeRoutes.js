const express = require('express');
const TransactionMaritimeRepository = require('../repository/TransactionMaritimeRepository');
const TransactionMaritimeService = require('../services/TransactionMaritimeService');
const TransactionMaritimeController = require('../controller/TransactionMaritimeController');

const router = express.Router(); 

const transactionMaritimeRepository = new TransactionMaritimeRepository();
const transactionMaritimeService = new TransactionMaritimeService(transactionMaritimeRepository);
const transactionMaritimeController = new TransactionMaritimeController(transactionMaritimeService);

router.post('/', (req, res) => transactionMaritimeController.createTransactionMaritime(req, res));
router.get('/search', (req, res) =>transactionMaritimeController.getResultSeach(req, res));
router.get('/', (req, res) => transactionMaritimeController.getAllTransactionMaritimes(req, res));
router.get('/:id', (req, res) =>transactionMaritimeController.getOneTransactionMaritime(req, res));
router.put('/:id', (req, res) => transactionMaritimeController.updateTransactionMaritime(req, res));
router.delete('/:id', (req, res) => transactionMaritimeController.deleteTransactionMaritime(req, res));

module.exports = router;
