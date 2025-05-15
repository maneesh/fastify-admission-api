const saasCustCourseController = require('../controllers/saasCustCourseController');
const auth = require('../middleware/auth');

async function saasCustCourseRoutes (fastify, options) {
  fastify.get('/saas_cust_courses',{ preHandler: auth }, saasCustCourseController.getAllSaasCustCourses);
  fastify.get('/saas_cust_courses/:id', saasCustCourseController.getSaasCustCourseById);
  fastify.post('/saas_cust_courses',{ preHandler: auth }, saasCustCourseController.createSaasCustCourse);
  fastify.put('/saas_cust_courses/:id',{ preHandler: auth }, (req, res) => saasCustCourseController.updateSaasCustCourse(req, res));
  fastify.delete('/saas_cust_courses/:id', saasCustCourseController.deleteSaasCustCourse);
}

module.exports = saasCustCourseRoutes;