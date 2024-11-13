const express = require('express');
const router = express.Router();
const variableController = require('../controllers/variable.controller');

router.post('/variable', variableController.createVariable);
router.get('/variable', variableController.getVariables);
router.put('/variable/:id', variableController.editVariable);
router.get('/variable/:id', variableController.getVariable);
router.delete('/variable/:id', variableController.deleteVariable);
router.get('/variables/file/:fileId', variableController.getVariablesByFile); // Nueva ruta

module.exports = router;