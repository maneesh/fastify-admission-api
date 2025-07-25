const upDistrictsController = require('../controllers/upDIstrictController');

async function upDistricts(fastify, options) {
  fastify.get('/up-districts', upDistrictsController.getDistrict);
}

module.exports = upDistricts;
