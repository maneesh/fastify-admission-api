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
    const {cust_id, domain, api_key, active_session} = req.body
    const custDetails = await CustDetails.create(cust_id, domain, api_key, active_session, req);
    res.status(201).send(custDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Error creating cust details'});
  }
};

exports.updateCustDetails = async (req, res) => {
  try {
    const {cust_id, domain, api_key, active_session} = req.body
    const custDetails = await CustDetails.update(req.params.id, cust_id, domain, api_key, active_session, req);
    res.send(custDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Error updating cust details'});
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