import { CreateRazorpayOrderService, GetAdmissionFeeByCustomerId, HandlePaymentSuccessService } from "../models/saasPayment.js";
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const CreateRazorpayOrderController = async (request, reply) => {
  try {
    const { receipt } = request.body;
    const cust_id = 2;

    const amountString = await GetAdmissionFeeByCustomerId(cust_id);
    const amount = Math.round(parseFloat(amountString) * 100);
    const currency = 'INR';

    console.log('amount cont:', amount);

    if (!amount || isNaN(amount)) {
      return reply.status(400).send({ success: false, message: "Amount is required or invalid" });
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