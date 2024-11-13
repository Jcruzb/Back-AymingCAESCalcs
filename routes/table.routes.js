const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller');

router.post('/table', tableController.createTable);
router.get('/tables', tableController.getTables);
router.put('/table/:id', tableController.editTable);
router.get('/table/:id', tableController.getTable);
//getTablesByFile
router.get('/tables/:id', tableController.getTablesByFile);
router.put('/table/:id/descontinue', tableController.descontinueTable);
router.delete('/table/:id', tableController.deleteTable);

module.exports = router;