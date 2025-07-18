const express = require(`express`);
const router = express.Router();
const casosController = require(`../controllers/casosController`);

router.get(`/casos`, casosController.getAllCasos);
router.get(`/casos/:id`, casosController.getCasosById);
router.post(`/casos`, casosController.createCaso);
router.put(`/casos/:id`, casosController.atualizarCaso);
router.patch(`/casos/:id`, casosController.atualizarParcialCaso);
router.delete(`/casos/:id`, casosController.deletarCaso);

module.exports = router;