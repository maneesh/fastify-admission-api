require('dotenv').config(); // Load environment variables
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');


// Routes
const studentRoutes = require('./routes/studentRoutes');
const saasCustRoutes = require('./routes/saasCustRoutes');
const custDetailsRoutes = require('./routes/custDetailsRoutes');
const courseTypesRoutes = require('./routes/courseTypesRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const courseTypeYrSemRoutes = require('./routes/courseTypeYrSemRoutes');
const saasCustCourseRoutes = require('./routes/saasCustCourseRoutes');
const saasCustCourseFeeRoutes = require('./routes/saasCustCourseFeeRoutes');
const saasStudentRegisterRoutes = require('./routes/saasStudentRegisterRoutes');
const saasStudentPaymentTransactionRoutes = require('./routes/saasStudentPaymentTransactionRoutes');
const userRoutes = require('./routes/userLoginRoutes');
const courseSession = require('./routes/courseSession');
const excelUpload = require('./routes/excelUploadRoutes');

// Start server inside async function to avoid top-level await
const start = async () => {
  try {
    // Register CORS
    await fastify.register(cors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    });

    // Register all routes under /saas prefix
    fastify.register(async function (app) {
      app.register(studentRoutes);
      app.register(saasCustRoutes);
      app.register(custDetailsRoutes);
      app.register(courseTypesRoutes);
      app.register(coursesRoutes);
      app.register(sessionRoutes);
      app.register(courseTypeYrSemRoutes);
      app.register(saasCustCourseRoutes);
      app.register(saasCustCourseFeeRoutes);
      app.register(saasStudentRegisterRoutes);
      app.register(saasStudentPaymentTransactionRoutes);
      app.register(userRoutes);
      app.register(courseSession);
      app.register(excelUpload);

      // Optional root route under /saas/
      app.get('/', async () => {
        return { hello: 'world' };
      });
    }, { prefix: '/saas' });

    // Start server
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
