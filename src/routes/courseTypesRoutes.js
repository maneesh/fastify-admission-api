const courseTypesController = require('../controllers/courseTypesController');

async function courseTypesRoutes (fastify, options) {
  fastify.get('/course_types', courseTypesController.getAllCourseTypes);
  fastify.get('/course_types/:id', courseTypesController.getCourseTypesById);
  fastify.post('/course_types', courseTypesController.createCourseTypes);
  fastify.put('/course_types/:id', courseTypesController.updateCourseTypes);
  fastify.delete('/course_types/:id', courseTypesController.deleteCourseTypes);
}

module.exports = courseTypesRoutes;