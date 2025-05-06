const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
async function userRoutes (fastify, options) {
  fastify.get('/users',{ preHandler: auth }, userController.getAllUsers);
  fastify.post('/cust-create', userController.createUser);
  fastify.post('/cust-user-login', userController.loginUser);
}

module.exports = userRoutes;