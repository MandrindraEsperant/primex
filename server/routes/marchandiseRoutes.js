const express = require('express');
const MarchandiseRepository = require('../repository/MarchandiseRepository');
const MarchandiseService = require('../services/MarchandiseService');
const MarchandiseController = require('../controller/MarchandiseController');

const router = express.Router(); 

const marchandiseRepository = new MarchandiseRepository();
const marchandiseService = new MarchandiseService(marchandiseRepository);
const marchandiseController = new MarchandiseController(marchandiseService);

router.post('/', (req, res) => marchandiseController.createMarchandise(req, res));
router.get('/', (req, res) => marchandiseController.getAllMarchandises(req, res));
router.get('/:id', (req, res) =>marchandiseController.getOneMarchandise(req, res));
router.put('/:id', (req, res) => marchandiseController.updateMarchandise(req, res));
router.delete('/:id', (req, res) => marchandiseController.deleteMarchandise(req, res));

module.exports = router;
