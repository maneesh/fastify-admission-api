const saasCustController = require('../controllers/saasCustController');
const auth = require('../middleware/auth');

async function saasCustRoutes (fastify, options) {
  fastify.get('/saas_custs',{ preHandler: auth }, saasCustController.getAllSaasCusts);
  fastify.get('/saas_custs/:id',{ preHandler: auth }, saasCustController.getSaasCustById);
  fastify.post('/saas_custs',{ preHandler: auth }, (req, res) => saasCustController.createSaasCust(req, res));
  fastify.put('/saas_custs/:id',{ preHandler: auth }, (req, res) => saasCustController.updateSaasCust(req, res));
  fastify.delete('/saas_custs/:id',{ preHandler: auth }, saasCustController.deleteSaasCust);
}

module.exports = saasCustRoutes;