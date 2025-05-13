const courseTypesController = require('../controllers/courseTypesController');
const auth = require('../middleware/auth');

async function courseTypesRoutes (fastify, options) {
  fastify.get('/course_types',{ preHandler: auth }, courseTypesController.getAllCourseTypes);
  fastify.get('/course_types/:id', courseTypesController.getCourseTypesById);
  fastify.post('/course_types', (req, res) => courseTypesController.createCourseTypes(req, res));
  fastify.put('/course_types/:id', (req, res) => courseTypesController.updateCourseTypes(req, res));
  fastify.delete('/course_types/:id', courseTypesController.deleteCourseTypes);
}

module.exports = courseTypesRoutes;