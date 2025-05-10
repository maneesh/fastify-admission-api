const coursesController = require('../controllers/coursesController');
const auth = require('../middleware/auth');

async function coursesRoutes (fastify, options) {
  fastify.get('/courses',{ preHandler: auth }, coursesController.getAllCourses);
  fastify.get('/courses/:id', coursesController.getCoursesById);
  fastify.post('/courses', coursesController.createCourses);
  fastify.put('/courses/:id', coursesController.updateCourses);
  fastify.delete('/courses/:id', coursesController.deleteCourses);
}

module.exports = coursesRoutes;