const coursesController = require('../controllers/coursesController');
const auth = require('../middleware/auth');

async function coursesRoutes (fastify, options) {
  fastify.get('/courses',{ preHandler: auth }, coursesController.getAllCourses);
  fastify.get('/courses/:id',{ preHandler: auth }, coursesController.getCoursesById);
  fastify.post('/courses',{ preHandler: auth }, (req, res) => coursesController.createCourses(req, res));
  fastify.put('/courses/:id',{ preHandler: auth }, (req, res) => coursesController.updateCourses(req, res));
  fastify.delete('/courses/:id',{ preHandler: auth }, coursesController.deleteCourses);
}

module.exports = coursesRoutes;