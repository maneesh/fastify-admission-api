const { getAllCountries } = require('../controllers/CountryController');

async function countryRoutes(fastify, options) {
  fastify.get('/countries', getAllCountries);
}

module.exports = countryRoutes;