const saasStudentPaymentTransactionController = require('../controllers/saasStudentPaymentTransactionController');
const auth = require('../middleware/auth');

async function saasStudentPaymentTransactionRoutes (fastify, options) {
  fastify.get('/saas_student_payment_transactions',{ preHandler: auth }, saasStudentPaymentTransactionController.getAllSaasStudentPaymentTransactions);
  fastify.get('/saas_student_payment_transactions/:id',{ preHandler: auth }, saasStudentPaymentTransactionController.getSaasStudentPaymentTransactionById);
  fastify.post('/saas_student_payment_transactions',{ preHandler: auth }, (req, res) => saasStudentPaymentTransactionController.createSaasStudentPaymentTransaction(req, res));
  fastify.put('/saas_student_payment_transactions/:id',{ preHandler: auth }, (req, res) => saasStudentPaymentTransactionController.updateSaasStudentPaymentTransaction(req, res));
  fastify.delete('/saas_student_payment_transactions/:id',{ preHandler: auth }, saasStudentPaymentTransactionController.deleteSaasStudentPaymentTransaction);
}

module.exports = saasStudentPaymentTransactionRoutes;