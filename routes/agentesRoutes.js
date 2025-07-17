const express = require(`express`);
const router = express.Router();
const agentesController = require(`../controllers/agentesControler`);

router.get(`/agentes`, agentesController.getAllAgentes);

module.exports = router;