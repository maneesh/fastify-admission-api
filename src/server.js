require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Register Swagger
fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'School Management System API',
      version: '1.0.0',
    },
  },
});

// Register Swagger UI
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
});

// Register CORS
fastify.register(cors, {
  origin: true,
});

// Register routes under /saas prefix
fastify.register(async function (app) {
  app.register(require('./routes/studentRoutes'));
  app.register(require('./routes/saasCustRoutes'));
  app.register(require('./routes/custDetailsRoutes'));
  app.register(require('./routes/courseTypesRoutes'));
  app.register(require('./routes/coursesRoutes'));
  app.register(require('./routes/sessionRoutes'));
  app.register(require('./routes/courseTypeYrSemRoutes'));
  app.register(require('./routes/saasCustCourseRoutes'));
  app.register(require('./routes/saasCustCourseFeeRoutes'));
  app.register(require('./routes/saasStudentRegisterRoutes'));
  app.register(require('./routes/saasStudentPaymentTransactionRoutes'));
  app.register(require('./routes/userLoginRoutes'));

  // Basic test route
  app.get('/', async () => {
    return { hello: 'world' };
  });
}, { prefix: '/saas' });

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
