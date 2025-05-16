const courseTypeYrSemController = require('../controllers/courseTypeYrSemController');
const auth = require('../middleware/auth');

async function courseTypeYrSemRoutes (fastify, options) {
  fastify.get('/course_type_yr_sems',{ preHandler: auth }, courseTypeYrSemController.getAllCourseTypeYrSems);
  fastify.get('/course_type_yr_sems/:id',{ preHandler: auth }, courseTypeYrSemController.getCourseTypeYrSemById);
  fastify.post('/course_type_yr_sems',{ preHandler: auth }, (req, res) => courseTypeYrSemController.createCourseTypeYrSem(req, res));
  fastify.put('/course_type_yr_sems/:id',{ preHandler: auth }, (req, res) => courseTypeYrSemController.updateCourseTypeYrSem(req, res));
  fastify.delete('/course_type_yr_sems/:id',{ preHandler: auth }, courseTypeYrSemController.deleteCourseTypeYrSem);
}

module.exports = courseTypeYrSemRoutes;