const coursesController = require('../controllers/coursesController');

async function coursesRoutes (fastify, options) {
  fastify.get('/courses', coursesController.getAllCourses);
  fastify.get('/courses/:id', coursesController.getCoursesById);
  fastify.post('/courses', coursesController.createCourses);
  fastify.put('/courses/:id', coursesController.updateCourses);
  fastify.delete('/courses/:id', coursesController.deleteCourses);
}

module.exports = coursesRoutes;