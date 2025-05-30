const adminUserController = require('../controllers/adminCourseTypeController');
const coursesController = require('../controllers/coursesController');
const auth = require('../middleware/authAdmin');


async function courseTypeRoutes (fastify, options) {
  fastify.get('/course-type',{ preHandler: auth }, adminUserController.getCourseType);
  fastify.get('/courses',{ preHandler: auth }, coursesController.getAllCourses);

  }

module.exports = courseTypeRoutes;