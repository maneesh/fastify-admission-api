const SaasCust = require('../models/SaasCust');

exports.getAllSaasCusts = async (req, res) => {
  try {
    const saasCusts = await SaasCust.getAll();
    res.send(saasCusts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas custs' });
  }
};

exports.getSaasCustById = async (req, res) => {
  try {
    const saasCust = await SaasCust.getById(req.params.id);
    if (!saasCust) {
      return res.status(404).send({ message: 'Saas cust not found' });
    }
    res.send(saasCust);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas cust' });
  }
};

exports.createSaasCust = async (req, res) => {
  try {
    const saasCust = await SaasCust.create(req.body.name);
    res.status(201).send(saasCust);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating saas cust' });
  }
};

exports.updateSaasCust = async (req, res) => {
  try {
    const saasCust = await SaasCust.update(req.params.id, req.body.name);
    res.send(saasCust);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating saas cust' });
  }
};

exports.deleteSaasCust = async (req, res) => {
  try {
    await SaasCust.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting saas cust' });
  }
};