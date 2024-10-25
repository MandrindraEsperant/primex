const express = require('express');
const HBLTransactionRepository = require('../repository/HBLTransactionRepository');
const HBLTransactionService = require('../services/HBLTransactionService');
const HBLTransactionController = require('../controller/HBLTransactionController');

const router = express.Router(); 

const hblTransactionRepository = new HBLTransactionRepository();
const hblTransactionService = new HBLTransactionService(hblTransactionRepository);
const hblTransactionController = new HBLTransactionController(hblTransactionService);

router.post('/', (req, res) => hblTransactionController.createHBLTransaction(req, res));
// router.get('/all/', (req, res) => hblTransactionController.getCountAllHBLTransaction(req, res));
router.get('/', (req, res) => hblTransactionController.getAllHBLTransactions(req, res));
router.get('/:id', (req, res) =>hblTransactionController.getOneHBLTransaction(req, res));
router.put('/:id', (req, res) => hblTransactionController.updateHBLTransaction(req, res));
router.delete('/:id', (req, res) => hblTransactionController.deleteHBLTransaction(req, res));

module.exports = router;
