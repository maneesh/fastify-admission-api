const sessionController = require('../controllers/sessionController');

async function sessionRoutes (fastify, options) {
  fastify.get('/sessions', sessionController.getAllSessions);
  fastify.get('/sessions/:id', sessionController.getSessionsById);
  fastify.post('/sessions', sessionController.createSession);
  fastify.put('/sessions/:id', sessionController.updateSession);
  fastify.delete('/sessions/:id', sessionController.deleteSession);
}

module.exports = sessionRoutes;