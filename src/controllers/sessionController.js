const Session = require('../models/Session');

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.getAll();
    res.send(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving sessions' });
  }
};

exports.getSessionsById = async (req, res) => {
  try {
    const session = await Session.getById(req.params.id);
    if (!session) {
      return res.status(404).send({ message: 'Session not found' });
    }
    res.send(session);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving session' });
  }
};

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body.academic_year, req.body.admission_type, req.body.start, req.body.end);
    res.status(201).send(session);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating session' });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.update(req.params.id, req.body.academic_year, req.body.admission_type, req.body.start, req.body.end);
    res.send(session);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating session' });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    await Session.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting session' });
  }
};