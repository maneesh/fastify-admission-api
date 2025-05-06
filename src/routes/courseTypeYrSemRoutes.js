const courseTypeYrSemController = require('../controllers/courseTypeYrSemController');

async function courseTypeYrSemRoutes (fastify, options) {
  fastify.get('/course_type_yr_sems', courseTypeYrSemController.getAllCourseTypeYrSems);
  fastify.get('/course_type_yr_sems/:id', courseTypeYrSemController.getCourseTypeYrSemById);
  fastify.post('/course_type_yr_sems', courseTypeYrSemController.createCourseTypeYrSem);
  fastify.put('/course_type_yr_sems/:id', courseTypeYrSemController.updateCourseTypeYrSem);
  fastify.delete('/course_type_yr_sems/:id', courseTypeYrSemController.deleteCourseTypeYrSem);
}

module.exports = courseTypeYrSemRoutes;