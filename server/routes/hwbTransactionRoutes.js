const express = require('express');
const HWBTransactionRepository = require('../repository/HWBTransactionRepository');
const HWBTransactionService = require('../services/HWBTransactionService');
const HWBTransactionController = require('../controller/HWBTransactionController');

const router = express.Router(); 

const hwbTransactionRepository = new HWBTransactionRepository();
const hwbTransactionService = new HWBTransactionService(hwbTransactionRepository);
const hwbTransactionController = new HWBTransactionController(hwbTransactionService);

router.post('/', (req, res) => hwbTransactionController.createHWBTransaction(req, res));
// router.get('/all/', (req, res) => hwbTransactionController.getCountAllHWBTransaction(req, res));
router.get('/', (req, res) => hwbTransactionController.getAllHWBTransactions(req, res));
router.get('/:id', (req, res) =>hwbTransactionController.getOneHWBTransaction(req, res));
router.put('/:id', (req, res) => hwbTransactionController.updateHWBTransaction(req, res));
router.delete('/:id', (req, res) => hwbTransactionController.deleteHWBTransaction(req, res));

module.exports = router;
