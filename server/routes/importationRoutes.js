const express = require('express');
const ImportationRepository = require('../repository/ImportationRepository');
const ImportationService = require('../services/ImportationService');
const ImportationController = require('../controller/ImportationController');

const router = express.Router(); 

const importationRepository = new ImportationRepository();
const importationService = new ImportationService(importationRepository);
const importationController = new ImportationController(importationService);

router.post('/', (req, res) => importationController.createImportation(req, res));
router.get('/', (req, res) => importationController.getAllImportations(req, res));
router.get('/:id', (req, res) =>importationController.getOneImportation(req, res));
router.put('/:id', (req, res) => importationController.updateImportation(req, res));
router.delete('/:id', (req, res) => importationController.deleteImportation(req, res));

module.exports = router;
