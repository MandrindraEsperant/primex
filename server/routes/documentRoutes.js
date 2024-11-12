const express = require('express');
const DocumentRepository = require('../repository/DocumentRepository');
const DocumentService = require('../services/DocumentService');
const DocumentController = require('../controller/DocumentController');

const router = express.Router(); 

const documentRepository = new DocumentRepository();
const documentService = new DocumentService(documentRepository);
const documentController = new DocumentController(documentService);

router.get('/docMWB/', (req, res) => documentController.docMWB(req, res));
router.get('/docMBL/:id', (req, res) => documentController.docMBL(req, res));

module.exports = router;