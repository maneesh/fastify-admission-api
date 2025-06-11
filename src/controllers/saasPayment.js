import { CreateRazorpayOrderService, HandlePaymentSuccessService } from "../models/saasPayment.js";

export const CreateRazorpayOrderController = async (request, reply) => {
  try {
    const { amount, currency = 'INR', receipt } = request.body;

    if (!amount || !receipt) {
      return reply.status(400).send({
        success: false,
        message: 'Amount and receipt are required',
      });
    }

    const order = await CreateRazorpayOrderService(amount, currency, receipt);
    return reply.send({ success: true, order });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      success: false,
      message: 'Failed to create Razorpay order',
    });
  }
};


export const HandlePaymentSuccess = async (request, reply) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      student_id,
    } = request.body;

    const result = await HandlePaymentSuccessService(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      student_id
    );

    reply.code(200).send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};