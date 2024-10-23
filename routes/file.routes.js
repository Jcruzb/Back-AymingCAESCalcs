const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');

router.post('/file', fileController.createFile);
router.get('/file', fileController.getFiles);
router.put('/file/:id', fileController.editFile);
router.get('/file/:id', fileController.getFile);
router.put('/file/:id/descontinue', fileController.descontinueFile);

module.exports = router;