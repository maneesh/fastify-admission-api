import mysql from 'mysql2/promise';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
import config from '../../config/config.js';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});





export const CreateRazorpayOrderService = async (razorpay, amount, currency, receipt) => {
  const options = {
    amount: parseInt(amount).toString(), 
    currency: currency.toString(),
    receipt: receipt.toString(),
  };
  console.log("Sending Razorpay Order Payload:", options);
  return await razorpay.orders.create(options);
};




export const HandlePaymentSuccessService = async (
  order_id,
  transaction_id,
  signature,
  student_id
) => {
  console.log('HandlePaymentSuccessService called with:', {
    order_id,
    transaction_id,
    signature,
    student_id,
  });

  const connection = await mysql.createConnection({
    host: config.development.host,
    user: config.development.username,
    password: config.development.password,
    database: config.development.database,
    multipleStatements: true,
  });

  try {
    // Step 1: Validate Razorpay signature
    const body = `${order_id}|${transaction_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    console.log('expectedSignature:', expectedSignature);
    console.log('provided signature:', signature);

    if (expectedSignature !== signature) {
      throw new Error('Invalid signature');
    }

    // Step 2: Get student info
    console.log('Fetching student info...');
    const [studentRows] = await connection.execute(
      'SELECT * FROM saas_student_register WHERE id = ?',
      [student_id]
    );
    console.log('studentRows:', studentRows);

    if (studentRows.length === 0) throw new Error('Student not found');
    const student = studentRows[0];

    // Step 3: Get fee info
    console.log(' Fetching fee info...');
    const [feeRows] = await connection.execute(
      'SELECT * FROM saas_cust_course_fee WHERE saas_cust_id = ? AND fee_type = ?',
      [student.cust_id, 'Registration']
    );
    console.log('feeRows:', feeRows);

    if (feeRows.length === 0) throw new Error('Fee not found');
    const fee = feeRows[0];

    // Final validation before insert
    if (!transaction_id || !order_id || !fee?.id || !fee?.amount) {
      throw new Error('Missing required payment details');
    }

    console.log('Preparing to insert payment record with:', {
      student_id,
      transaction_id,
      fee_id: fee.id,
      amount: fee.amount,
      order_id,
    });

    // Step 4: Insert payment record
    try {
      await connection.execute(
        `INSERT INTO saas_student_payment_transaction
          (register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id, order_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          student_id ?? null,
          new Date(),
          transaction_id ?? null,
          'Success',
          fee.amount ?? null,
          fee.id ?? null,
          order_id ?? null,
        ]
      );
      console.log('Payment record inserted successfully');
    } catch (insertErr) {
      console.error('Error during INSERT:', insertErr);
      throw insertErr;
    }

    return { status: 'success', message: 'Payment successful' };
  } catch (err) {
    console.error('Payment Error:', err);
    throw err;
  } finally {
    await connection.end();
  }
};
