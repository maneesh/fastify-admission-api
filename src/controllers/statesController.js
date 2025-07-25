const stateModel = require('../models/statesModel');

const getStates = async (request, reply) => {
  try {
    const states = await stateModel.getAllStates();
    reply.send(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    reply.code(500).send({ error: 'Failed to fetch states' });
  }
};

module.exports = {
  getStates,
};
