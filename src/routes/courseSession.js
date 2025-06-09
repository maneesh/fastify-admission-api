const courseSessionController = require('../controllers/courseSessionController');
const auth = require('../middleware/auth');

async function courseSessionRoutes (fastify, options) {
  fastify.get('/course-session',{ preHandler: auth }, courseSessionController.getAllCourseSession);
  //fastify.get('/courses/:id',{ preHandler: auth }, coursesController.getCoursesById);
  fastify.post('/course-session',{ preHandler: auth }, (req, res) => courseSessionController.createCourseSession(req, res));
  fastify.put('/course-session/:id',{ preHandler: auth }, (req, res) => courseSessionController.updateCourseSession(req, res));
  fastify.delete('/course-session/:id',{ preHandler: auth }, courseSessionController.deleteCourseSession);
}

module.exports = courseSessionRoutes;