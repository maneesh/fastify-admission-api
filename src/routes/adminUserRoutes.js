const adminUserController = require('../controllers/adminUserController');
const auth = require('../middleware/authAdmin');


async function userRoutes (fastify, options) {
  fastify.get('/all-users',{ preHandler: auth }, adminUserController.getAllUsers);
  fastify.post('/login', adminUserController.loginUser);
  }

module.exports = userRoutes;