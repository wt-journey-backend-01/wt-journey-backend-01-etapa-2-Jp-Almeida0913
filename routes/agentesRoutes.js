const express = require(`express`);
const router = express.Router();
const agentesController = require(`../controllers/agentesController`);

router.get(`/agentes`, agentesController.getAllAgentes);
router.get(`/agentes/:id`, agentesController.getAgenteById);
router.post(`/agentes`, agentesController.createAgente);
router.put(`/agentes/:id`, agentesController.atualizarAgente);
router.patch(`/agentes/:id`, agentesController.atualizarParcialAgente);
router.delete(`/agentes/:id`, agentesController.deletarAgente);

module.exports = router;