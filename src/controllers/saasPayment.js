import { CreateRazorpayOrderService, HandlePaymentSuccessService } from "../models/saasPayment.js";
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const CreateRazorpayOrderController = async (request, reply) => {
  try {
    const { amount, currency = 'INR', receipt } = request.body;

    if (!amount) {
      return reply.status(400).send({ success: false, message: "Amount is required" });
    }

    const order = await CreateRazorpayOrderService(razorpay, amount, currency, receipt);

    return reply.send({ success: true, data: order });
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