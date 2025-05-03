const saasCustCourseController = require('../controllers/saasCustCourseController');

async function saasCustCourseRoutes (fastify, options) {
  fastify.get('/saas_cust_courses', saasCustCourseController.getAllSaasCustCourses);
  fastify.get('/saas_cust_courses/:id', saasCustCourseController.getSaasCustCourseById);
  fastify.post('/saas_cust_courses', saasCustCourseController.createSaasCustCourse);
  fastify.put('/saas_cust_courses/:id', saasCustCourseController.updateSaasCustCourse);
  fastify.delete('/saas_cust_courses/:id', saasCustCourseController.deleteSaasCustCourse);
}

module.exports = saasCustCourseRoutes;