const getCountries = async (request, reply) => {
  try {
    const res = await fetch('https://api.first.org/data/v1/countries');

    if (!res.ok) {
      throw new Error(`Failed to fetch, status: ${res.status}`);
    }

    const data = await res.json();

    if (!data || typeof data.data !== 'object') {
      console.error('Unexpected response:', data);
      return reply.code(500).send({ error: 'Invalid response format from country API' });
    }

    const countries = Object.entries(data.data).map(([code, info]) => ({
      name: info.country,
      code: code,
    }));

    reply.send(countries);
  } catch (error) {
    console.error('Fetch error:', error.message);
    reply.code(500).send({ error: 'Failed to fetch countries' });
  }
};

module.exports = {
  getAllCountries: getCountries, // Renamed to match route handler usage
};

