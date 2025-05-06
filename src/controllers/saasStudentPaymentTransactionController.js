const SaasStudentPaymentTransaction = require('../models/SaasStudentPaymentTransaction');

exports.getAllSaasStudentPaymentTransactions = async (req, res) => {
  try {
    const saasStudentPaymentTransactions = await SaasStudentPaymentTransaction.getAll();
    res.send(saasStudentPaymentTransactions);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas student payment transactions' });
  }
};

exports.getSaasStudentPaymentTransactionById = async (req, res) => {
  try {
    const saasStudentPaymentTransaction = await SaasStudentPaymentTransaction.getById(req.params.id);
    if (!saasStudentPaymentTransaction) {
      return res.status(404).send({ message: 'Saas student payment transaction not found' });
    }
    res.send(saasStudentPaymentTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas student payment transaction' });
  }
};

exports.createSaasStudentPaymentTransaction = async (req, res) => {
  try {
    const saasStudentPaymentTransaction = await SaasStudentPaymentTransaction.create(req.body.register_student_id, req.body.start_date_time, req.body.gateway_transaction_id, req.body.status, req.body.amount, req.body.fee_id);
    res.status(201).send(saasStudentPaymentTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating saas student payment transaction' });
  }
};

exports.updateSaasStudentPaymentTransaction = async (req, res) => {
  try {
    const saasStudentPaymentTransaction = await SaasStudentPaymentTransaction.update(req.params.id, req.body.register_student_id, req.body.start_date_time, req.body.gateway_transaction_id, req.body.status, req.body.amount, req.body.fee_id);
    res.send(saasStudentPaymentTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating saas student payment transaction' });
  }
};

exports.deleteSaasStudentPaymentTransaction = async (req, res) => {
  try {
    await SaasStudentPaymentTransaction.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting saas student payment transaction' });
  }
};