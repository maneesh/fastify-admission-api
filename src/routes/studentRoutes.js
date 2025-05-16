const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');

async function studentRoutes (fastify, options) {
  fastify.get('/students',{ preHandler: auth }, studentController.getAllStudents);
  fastify.get('/students/:id',{ preHandler: auth }, studentController.getStudentById);
}

module.exports = studentRoutes;