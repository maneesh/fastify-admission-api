const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
async function userRoutes (fastify, options) {
  fastify.get('/users',{ preHandler: auth }, userController.getAllUsers);
    fastify.post('/cust-create', (req, res) => userController.createUser(req, res));
    fastify.post('/cust-user-login', userController.loginUser);
  }

module.exports = userRoutes;