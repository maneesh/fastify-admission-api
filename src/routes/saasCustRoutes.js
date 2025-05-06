const saasCustController = require('../controllers/saasCustController');

async function saasCustRoutes (fastify, options) {
  fastify.get('/saas_custs', saasCustController.getAllSaasCusts);
  fastify.get('/saas_custs/:id', saasCustController.getSaasCustById);
  fastify.post('/saas_custs', saasCustController.createSaasCust);
  fastify.put('/saas_custs/:id', saasCustController.updateSaasCust);
  fastify.delete('/saas_custs/:id', saasCustController.deleteSaasCust);
}

module.exports = saasCustRoutes;