const jwt = require('jsonwebtoken');

function verifyToken(request, reply, done) {
  const authHeader = request.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded; // attach decoded info to request
    console.log('decoded',decoded)
    done(); // proceed to the route
  } catch (err) {
    return reply.status(403).send({ message: 'Forbidden: Invalid token' });
  }
}

module.exports = verifyToken;
