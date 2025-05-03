const SaasCustCourseFee = require('../models/SaasCustCourseFee');

exports.getAllSaasCustCourseFees = async (req, res) => {
  try {
    const saasCustCourseFees = await SaasCustCourseFee.getAll();
    res.send(saasCustCourseFees);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas cust course fees' });
  }
};

exports.getSaasCustCourseFeeById = async (req, res) => {
  try {
    const saasCustCourseFee = await SaasCustCourseFee.getById(req.params.id);
    if (!saasCustCourseFee) {
      return res.status(404).send({ message: 'Saas cust course fee not found' });
    }
    res.send(saasCustCourseFee);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas cust course fee' });
  }
};

exports.createSaasCustCourseFee = async (req, res) => {
  try {
    const saasCustCourseFee = await SaasCustCourseFee.create(req.body.saas_cust_id, req.body.fee_type, req.body.amount, req.body.categery, req.body.updated_by);
    res.status(201).send(saasCustCourseFee);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating saas cust course fee' });
  }
};

exports.updateSaasCustCourseFee = async (req, res) => {
  try {
    const saasCustCourseFee = await SaasCustCourseFee.update(req.params.id, req.body.saas_cust_id, req.body.fee_type, req.body.amount, req.body.categery, req.body.updated_by);
    res.send(saasCustCourseFee);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating saas cust course fee' });
  }
};

exports.deleteSaasCustCourseFee = async (req, res) => {
  try {
    await SaasCustCourseFee.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting saas cust course fee' });
  }
};