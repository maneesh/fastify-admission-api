const saasCustCourseFeeController = require('../controllers/saasCustCourseFeeController');

async function saasCustCourseFeeRoutes (fastify, options) {
  fastify.get('/saas_cust_course_fees', saasCustCourseFeeController.getAllSaasCustCourseFees);
  fastify.get('/saas_cust_course_fees/:id', saasCustCourseFeeController.getSaasCustCourseFeeById);
  fastify.post('/saas_cust_course_fees', saasCustCourseFeeController.createSaasCustCourseFee);
  fastify.put('/saas_cust_course_fees/:id', saasCustCourseFeeController.updateSaasCustCourseFee);
  fastify.delete('/saas_cust_course_fees/:id', saasCustCourseFeeController.deleteSaasCustCourseFee);
}

module.exports = saasCustCourseFeeRoutes;