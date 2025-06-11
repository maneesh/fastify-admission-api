const { CreateRazorpayOrderController, HandlePaymentSuccess } = require('../controllers/saasPayment');

async function saasStudentPaymentRoutes (fastify, options) {
  fastify.post("/create-order",CreateRazorpayOrderController);
  fastify.post("/payment-success", HandlePaymentSuccess);
}

module.exports = saasStudentPaymentRoutes;