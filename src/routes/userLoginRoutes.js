const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
async function userRoutes (fastify, options) {
  fastify.get('/users',{ preHandler: auth }, userController.getAllUsers);
  fastify.post('/users', userController.createUser);
  fastify.post('/users/login', userController.loginUser);
}

module.exports = userRoutes;