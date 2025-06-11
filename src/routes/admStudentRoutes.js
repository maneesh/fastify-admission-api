const saasStudentRegisterController = require('../controllers/saasStudentRegisterController');


const auth = require('../middleware/authAdmin');

async function admStudentRegisterRoutes (fastify, options) {
  fastify.get('/student_register',{ preHandler: auth }, saasStudentRegisterController.getAllSaasStudentRegisters);

}
module.exports = admStudentRegisterRoutes;