const SaasStudentRegister = require('../models/SaasStudentRegister');

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
    const { cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num } = req.body;
    const saasStudentRegister = await SaasStudentRegister.create(cust_id, course_id, year_sem_id, register_session, full_name, email, mobile, date_of_birth, father_name, mother_name, registration_num, req);
    res.status(201).send(saasStudentRegister);
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