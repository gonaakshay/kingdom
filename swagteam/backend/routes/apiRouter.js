const express = require('express');
const multer = require('multer');
const config = require('../config');
const {
  uploadSwagger,
  generateTestCasesController,
  runTestsController,
} = require('../controller/apiController');

const router = express.Router();
const upload = multer({ dest: config.UPLOADS_PATH });

router.post('/upload', upload.single('swagger'), uploadSwagger);
router.post('/generate-test-cases', generateTestCasesController);
router.post('/test', runTestsController);

module.exports = router;
