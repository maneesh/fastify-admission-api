const fastify = require('fastify')();
const { sequelize } = require('./db/connection');

// Import routes
const coursesRoutes = require('./routes/coursesRoutes');
const courseTypesRoutes = require('./routes/courseTypesRoutes');
const courseTypeYrSemRoutes = require('./routes/courseTypeYrSemRoutes');
const custDetailsRoutes = require('./routes/custDetailsRoutes');
const saasCustCourseFeeRoutes = require('./routes/saasCustCourseFeeRoutes');
const saasCustCourseRoutes = require('./routes/saasCustCourseRoutes');
const saasCustRoutes = require('./routes/saasCustRoutes');
const saasStudentPaymentTransactionRoutes = require('./routes/saasStudentPaymentTransactionRoutes');
const saasStudentRegisterRoutes = require('./routes/saasStudentRegisterRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const studentRoutes = require('./routes/studentRoutes');
const userLoginRoutes = require('./routes/userLoginRoutes');

// Register Swagger (OpenAPI spec generator)
fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'School Management System API',
      version: '1.0.0',
    },
  },
});

// Register Swagger UI (to expose /documentation route)
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

// Register routes
fastify.register(coursesRoutes);
fastify.register(courseTypesRoutes);
fastify.register(courseTypeYrSemRoutes);
fastify.register(custDetailsRoutes);
fastify.register(saasCustCourseFeeRoutes);
fastify.register(saasCustCourseRoutes);
fastify.register(saasCustRoutes);
fastify.register(saasStudentPaymentTransactionRoutes);
fastify.register(saasStudentRegisterRoutes);
fastify.register(sessionRoutes);
fastify.register(studentRoutes);
fastify.register(userLoginRoutes);

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    const address = fastify.server.address();
    const port = typeof address === 'string' ? address : address.port;
    console.log(`Server listening on ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
