// routes/excelUploadRoutes.js

const excelUploadController = require('../controllers/excelUploadController');
const excelDownloadController = require('../controllers/excelDownload');
const auth = require('../middleware/auth');

async function excelUploadRoutes(fastify, options) {
  fastify.register(require('@fastify/multipart')); // ensure this is registered globally too

  fastify.post('/excel-upload', {preHandler: auth},excelUploadController.createExcelUpload);
  fastify.get('/download-excel', {preHandler: auth},excelDownloadController.excelDownloadRoute);

}

module.exports = excelUploadRoutes;
