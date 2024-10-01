const express = require('express');
const EmployeRepository = require('../repository/EmployeRepository');
const EmployeService = require('../services/EmployeServices');
const EmployeController = require('../controller/EmployeController');

const router = express.Router();

const employeRepository = new EmployeRepository();
const employeService = new EmployeService(employeRepository);
const employeController = new EmployeController(employeService);

router.post('/', (req, res) => employeController.createEmploye(req, res));
router.get('/:id', (req, res) =>employeController.getEmploye(req, res));
router.get('/', (req, res) => employeController.getAllEmployes(req, res));
router.put('/:id', (req, res) => employeController.updateEmploye(req, res));
router.delete('/:id', (req, res) => employeController.deleteEmploye(req, res));
router.post('/login', (req, res) => employeController.authentification(req, res));

module.exports = router;
