const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

/**
 * @route GET /agentes
 * @desc Retorna todos os agentes
 * @access Público
 */
router.get('/agentes', agentesController.getAgentes);

/**
 * @route GET /agentes/:id
 * @desc Retorna um agente específico por ID
 * @access Público
 */
router.get('/agentes/:id', agentesController.getAgenteById);

/**
 * @route POST /agentes
 * @desc Cria um novo agente
 * @access Público
 */
router.post('/agentes', agentesController.createAgente);

/**
 * @route PUT /agentes/:id
 * @desc Atualiza um agente completamente pelo ID
 * @access Público
 */
router.put('/agentes/:id', agentesController.atualizarAgente);

/**
 * @route PATCH /agentes/:id
 * @desc Atualiza parcialmente um agente pelo ID
 * @access Público
 */
router.patch('/agentes/:id', agentesController.atualizarParcialAgente);

/**
 * @route DELETE /agentes/:id
 * @desc Remove um agente pelo ID
 * @access Público
 */
router.delete('/agentes/:id', agentesController.deletarAgente);

module.exports = router;