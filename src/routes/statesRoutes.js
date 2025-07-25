const stateController = require('../controllers/statesController');

async function stateRoutes(fastify, options) {
  fastify.get('/states', stateController.getStates);
}

module.exports = stateRoutes;
