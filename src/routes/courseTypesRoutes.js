const courseTypesController = require('../controllers/courseTypesController');
const auth = require('../middleware/auth');

async function courseTypesRoutes (fastify, options) {
  fastify.get('/course_types',{ preHandler: auth }, courseTypesController.getAllCourseTypes);
    fastify.get('/course_typess', courseTypesController.getAllCourseTypes);
  fastify.get('/course_types/:id',{ preHandler: auth }, courseTypesController.getCourseTypesById);
  fastify.post('/course_types',{ preHandler: auth }, (req, res) => courseTypesController.createCourseTypes(req, res));
  fastify.put('/course_types/:id',{ preHandler: auth }, (req, res) => courseTypesController.updateCourseTypes(req, res));
  fastify.delete('/course_types/:id',{ preHandler: auth }, courseTypesController.deleteCourseTypes);
}

module.exports = courseTypesRoutes;