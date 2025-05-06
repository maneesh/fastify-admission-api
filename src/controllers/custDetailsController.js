const CustDetails = require('../models/CustDetails');

exports.getAllCustDetails = async (req, res) => {
  try {
    const custDetails = await CustDetails.getAll();
    res.send(custDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving cust details' });
  }
};

exports.getCustDetailsById = async (req, res) => {
  try {
    const custDetails = await CustDetails.getById(req.params.id);
    if (!custDetails) {
      return res.status(404).send({ message: 'Cust details not found' });
    }
    res.send(custDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving cust details' });
  }
};

exports.createCustDetails = async (req, res) => {
  try {
    const custDetails = await CustDetails.create(req.body.cust_id, req.body.domain, req.body.api_key, req.body.active_session);
    res.status(201).send(custDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating cust details' });
  }
};

exports.updateCustDetails = async (req, res) => {
  try {
    const custDetails = await CustDetails.update(req.params.id, req.body.cust_id, req.body.domain, req.body.api_key, req.body.active_session);
    res.send(custDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating cust details' });
  }
};

exports.deleteCustDetails = async (req, res) => {
  try {
    await CustDetails.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting cust details' });
  }
};