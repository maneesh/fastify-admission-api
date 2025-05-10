const saasStudentRegisterController = require('../controllers/saasStudentRegisterController');
const auth = require('../middleware/auth');

async function saasStudentRegisterRoutes (fastify, options) {
  fastify.get('/saas_student_register',{ preHandler: auth }, saasStudentRegisterController.getAllSaasStudentRegisters);
  fastify.get('/saas_student_registers/:id', saasStudentRegisterController.getSaasStudentRegisterById);
  fastify.post('/saas_student_registers', saasStudentRegisterController.createSaasStudentRegister);
  fastify.put('/saas_student_registers/:id', saasStudentRegisterController.updateSaasStudentRegister);
  fastify.delete('/saas_student_register/:id', saasStudentRegisterController.deleteSaasStudentRegister);
}

module.exports = saasStudentRegisterRoutes;