const { CreateRazorpayOrderService } = require('../models/saasPayment');
const SaasStudentRegister = require('../models/SaasStudentRegister');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
exports.getAllSaasStudentRegisters = async (req, res) => {
  try {
   const cust_id = req?.user?.cust_id;
    const saasStudentRegisters = await SaasStudentRegister.getAll(cust_id);
    res.send(saasStudentRegisters);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas student registers' });
  }
};

exports.getSaasStudentRegisterById = async (req, res) => {
  try {
    const saasStudentRegister = await SaasStudentRegister.getById(req.params.id);
    if (!saasStudentRegister) {
      return res.status(404).send({ message: 'Saas student register not found' });
    }
    res.send(saasStudentRegister);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas student register' });
  }
};


exports.createSaasStudentRegister = async (req, res) => {
  try {
    const {
      cust_id,
      course_id,
      year_sem_id,
      full_name,
      email,
      mobile,
      date_of_birth,
      father_name,
      mother_name
    } = req.body;

    // 1. Check duplicate mobile
    const existing = await SaasStudentRegister.findByMobile(mobile);
    if (existing) {
      return res.status(400).send({ message: "Mobile number already exists" });
    }

    // 2. Get current academic session
    const sessions = await SaasStudentRegister.getAllSessions();
    const currentYear = new Date().getFullYear();
    const session = sessions.find(s => s.academic_year.startsWith(currentYear.toString()));
    const register_session = session ? session.id : null;

    if (!register_session) {
      return res.status(400).send({ message: "No matching academic session found for current year" });
    }

    // 3. Generate registration number
    const course = await SaasStudentRegister.getCourseById(course_id);
    const courseCode = course.course_name.replace(/\./g, "").toUpperCase();
    const instituteCode = "BPG";
    const studentCount = await SaasStudentRegister.countStudentsByYear(currentYear);
    const serial = String(studentCount + 1).padStart(3, "0");
    const registration_num = `${instituteCode}${currentYear}${courseCode}${serial}`;

    // 4. Create student record
    const saasStudentRegister = await SaasStudentRegister.create(
      cust_id,
      course_id,
      year_sem_id,
      register_session,
      full_name,
      email,
      mobile,
      date_of_birth,
      father_name,
      mother_name,
      registration_num // ✅ static created_by is handled inside model
    );
     
      
    const amount = 50*100; // ₹50
    const currency = "INR";
    const receipt = saasStudentRegister.registration_num;
     const razorpayOrder = await CreateRazorpayOrderService(
      razorpay,
      amount,
      currency,
      receipt
    );
    res.status(201).send({saasStudentRegister,razorpayOrder});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating saas student register' });
  }
};



exports.updateSaasStudentRegister = async (req, res) => {
  try {
    const { cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num } = req.body;
    const saasStudentRegister = await SaasStudentRegister.update(req.params.id, cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num, req);
    res.send(saasStudentRegister);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating saas student register' });
  }
};

exports.deleteSaasStudentRegister = async (req, res) => {
  try {
    await SaasStudentRegister.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting saas student register' });
  }
};