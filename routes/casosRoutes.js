const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

/**
 * @route GET /casos
 * @desc Retorna todos os casos
 * @access Público
 */
router.get('/casos', casosController.getCasos);

/**
 * @route GET /casos/:id
 * @desc Retorna um caso específico por ID
 * @access Público
 */
router.get('/casos/:id', casosController.getCasosById);


/**
 * @route POST /casos
 * @desc Cria um novo caso
 * @access Público
 */
router.post('/casos', casosController.createCaso);

/**
 * @route PUT /casos/:id
 * @desc Atualiza completamente um caso pelo ID
 * @access Público
 */
router.put('/casos/:id', casosController.atualizarCaso);

/**
 * @route PATCH /casos/:id
 * @desc Atualiza parcialmente um caso pelo ID
 * @access Público
 */
router.patch('/casos/:id', casosController.atualizarParcialCaso);

/**
 * @route DELETE /casos/:id
 * @desc Remove um caso pelo ID
 * @access Público
 */
router.delete('/casos/:id', casosController.deletarCaso);

module.exports = router;