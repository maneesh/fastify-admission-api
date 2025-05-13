const saasCustController = require('../controllers/saasCustController');

async function saasCustRoutes (fastify, options) {
  fastify.get('/saas_custs', saasCustController.getAllSaasCusts);
  fastify.get('/saas_custs/:id', saasCustController.getSaasCustById);
  fastify.post('/saas_custs', (req, res) => saasCustController.createSaasCust(req, res));
  fastify.put('/saas_custs/:id', (req, res) => saasCustController.updateSaasCust(req, res));
  fastify.delete('/saas_custs/:id', saasCustController.deleteSaasCust);
}

module.exports = saasCustRoutes;