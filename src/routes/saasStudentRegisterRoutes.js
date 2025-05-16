const saasStudentRegisterController = require('../controllers/saasStudentRegisterController');
const studentDetailsController = require('../controllers/studentDetailsController');
const studentMarksController = require('../controllers/studentMarksController');

const auth = require('../middleware/auth');

async function saasStudentRegisterRoutes (fastify, options) {
  fastify.get('/saas_student_register',{ preHandler: auth }, saasStudentRegisterController.getAllSaasStudentRegisters);
  fastify.get('/saas_student_registers/:id',{ preHandler: auth }, saasStudentRegisterController.getSaasStudentRegisterById);
  fastify.post('/saas_student_registers',{ preHandler: auth }, (req, res) => saasStudentRegisterController.createSaasStudentRegister(req, res));
  fastify.put('/saas_student_registers/:id',{ preHandler: auth }, (req, res) => saasStudentRegisterController.updateSaasStudentRegister(req, res));
  fastify.delete('/saas_student_registers/:id',{ preHandler: auth }, saasStudentRegisterController.deleteSaasStudentRegister);
  fastify.get('/student-details/:id',{ preHandler: auth }, studentDetailsController.getAllStudentDetails);
  fastify.get('/student-marks/:id',{ preHandler: auth }, studentMarksController.getAllStudentMarks);
}

module.exports = saasStudentRegisterRoutes;