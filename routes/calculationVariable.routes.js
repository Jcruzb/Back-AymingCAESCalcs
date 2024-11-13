const express = require('express');
const router = express.Router();
const calculationVariableController = require('../controllers/calculationVariable.controller');

router.post('/calculationVariable', calculationVariableController.createCalculationVariable);
router.get('/calculationVariable', calculationVariableController.getCalculationVariables);
router.put('/calculationVariable/:id', calculationVariableController.editCalculationVariable);
router.get('/calculationVariable/:id', calculationVariableController.getCalculationVariable);
router.delete('/calculationVariable/:id', calculationVariableController.deleteCalculationVariable);
router.get('/calculationVariables/file/:fileId', calculationVariableController.getCalculationVariablesByFile); // Nueva ruta

module.exports = router;