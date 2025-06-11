const saasCustCourseFeeController = require('../controllers/saasCustCourseFeeController');
const auth = require('../middleware/authAdmin');

async function courseFeeRoutes (fastify, options) {
  fastify.get('/course-fees',{ preHandler: auth }, saasCustCourseFeeController.getAllSaasCustCourseFees);
}

module.exports = courseFeeRoutes;