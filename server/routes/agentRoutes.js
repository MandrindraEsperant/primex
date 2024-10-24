const express = require('express');
const AgentRepository = require('../repository/AgentRepository');
const AgentService = require('../services/AgentService');
const AgentController = require('../controller/AgentController');

const router = express.Router(); 

const agentRepository = new AgentRepository();
const agentService = new AgentService(agentRepository);
const agentController = new AgentController(agentService);

router.post('/', (req, res) => agentController.createAgent(req, res));
router.get('/search', (req, res) =>agentController.getResultSeach(req, res)); 
router.get('/all/', (req, res) =>agentController.getCountAllAgents(req, res)); 
router.get('/', (req, res) => agentController.getAllAgents(req, res));
router.get('/:id', (req, res) =>agentController.getAgentById(req, res));
router.put('/:id', (req, res) => agentController.updateAgent(req, res));
router.delete('/:id', (req, res) => agentController.deleteAgent(req, res));

module.exports = router;