const express = require('express');
const ExportationRepository = require('../repository/ExportationRepository');
const ExportationService = require('../services/ExportationService');
const ExportationController = require('../controller/ExportationController');

const router = express.Router(); 

const exportationRepository = new ExportationRepository();
const exportationService = new ExportationService(exportationRepository);
const exportationController = new ExportationController(exportationService);

router.post('/', (req, res) => exportationController.createExportation(req, res));
router.get('/all/', (req, res) => exportationController.getCountAllExportation(req, res));
router.get('/', (req, res) => exportationController.getAllExportations(req, res));
router.get('/:id', (req, res) =>exportationController.getOneExportation(req, res));
router.put('/:id', (req, res) => exportationController.updateExportation(req, res));
router.delete('/:id', (req, res) => exportationController.deleteExportation(req, res));

module.exports = router;
