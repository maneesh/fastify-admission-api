const saasStudentPaymentTransactionController = require('../controllers/saasStudentPaymentTransactionController');

async function saasStudentPaymentTransactionRoutes (fastify, options) {
  fastify.get('/saas_student_payment_transactions', saasStudentPaymentTransactionController.getAllSaasStudentPaymentTransactions);
  fastify.get('/saas_student_payment_transactions/:id', saasStudentPaymentTransactionController.getSaasStudentPaymentTransactionById);
  fastify.post('/saas_student_payment_transactions', saasStudentPaymentTransactionController.createSaasStudentPaymentTransaction);
  fastify.put('/saas_student_payment_transactions/:id', saasStudentPaymentTransactionController.updateSaasStudentPaymentTransaction);
  fastify.delete('/saas_student_payment_transactions/:id', saasStudentPaymentTransactionController.deleteSaasStudentPaymentTransaction);
}

module.exports = saasStudentPaymentTransactionRoutes;