const express = require('express');
const HouseTransactionRepository = require('../repository/HBLTransactionRepository');
const HouseTransactionService = require('../services/HouseTransactionService');
const HouseTransactionController = require('../controller/HouseTransactionController');

const router = express.Router(); 

const houseTransactionRepository = new HouseTransactionRepository();
const houseTransactionService = new HouseTransactionService(houseTransactionRepository);
const houseTransactionController = new HouseTransactionController(houseTransactionService);

router.post('/', (req, res) => houseTransactionController.createHouseTransaction(req, res));
// router.get('/all/', (req, res) => HouseTransactionController.getCountAllHouseTransaction(req, res));
router.get('/', (req, res) => houseTransactionController.getAllHouseTransactions(req, res));
router.get('/:id', (req, res) =>houseTransactionController.getOneHouseTransaction(req, res));
router.put('/:id', (req, res) => houseTransactionController.updateHouseTransaction(req, res));
router.delete('/:id', (req, res) => houseTransactionController.deleteHouseTransaction(req, res));

module.exports = router;
