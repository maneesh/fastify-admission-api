const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/auth');

async function sessionRoutes (fastify, options) {
  fastify.get('/sessions',{ preHandler: auth }, sessionController.getAllSessions);
  fastify.get('/sessions/:id',{ preHandler: auth }, sessionController.getSessionsById);
  fastify.post('/sessions',{ preHandler: auth }, sessionController.createSession);
  fastify.put('/sessions/:id',{ preHandler: auth }, sessionController.updateSession);
  fastify.delete('/sessions/:id',{ preHandler: auth }, sessionController.deleteSession);
}

module.exports = sessionRoutes;