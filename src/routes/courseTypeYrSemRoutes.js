const courseTypeYrSemController = require('../controllers/courseTypeYrSemController');
const auth = require('../middleware/auth');

async function courseTypeYrSemRoutes (fastify, options) {
  fastify.get('/course_type_yr_sems',{ preHandler: auth }, courseTypeYrSemController.getAllCourseTypeYrSems);
  fastify.get('/course_type_yr_sems/:id', courseTypeYrSemController.getCourseTypeYrSemById);
  fastify.post('/course_type_yr_sems', courseTypeYrSemController.createCourseTypeYrSem);
  fastify.put('/course_type_yr_sems/:id', courseTypeYrSemController.updateCourseTypeYrSem);
  fastify.delete('/course_type_yr_sems/:id', courseTypeYrSemController.deleteCourseTypeYrSem);
}

module.exports = courseTypeYrSemRoutes;