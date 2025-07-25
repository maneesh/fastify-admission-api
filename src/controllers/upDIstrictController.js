const upDistrictsModel = require('../models/UpDistricts');

const getDistrict = async (request, reply) => {
  try {
    const upDistricts = await upDistrictsModel.getUpDistricts();
    reply.send(upDistricts);
  } catch (error) {
    console.error('Error fetching states:', error);
    reply.code(500).send({ error: 'Failed to fetch UpDistricts' });
  }
};

module.exports = {
  getDistrict,
};
