const studentController = require('../controllers/studentController');

async function studentRoutes (fastify, options) {
  fastify.get('/students', studentController.getAllStudents);
  fastify.get('/students/:id', studentController.getStudentById);
}

module.exports = studentRoutes;