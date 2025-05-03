const fastify = require('fastify')({ logger: true });
const connection = require('./db/connection');
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

// Register routes
fastify.register(studentRoutes);
fastify.register(saasCustRoutes);
fastify.register(custDetailsRoutes);
fastify.register(courseTypesRoutes);
fastify.register(coursesRoutes);
fastify.register(sessionRoutes);
fastify.register(courseTypeYrSemRoutes);
fastify.register(saasCustCourseRoutes);
fastify.register(saasCustCourseFeeRoutes);
fastify.register(saasStudentRegisterRoutes);
fastify.register(saasStudentPaymentTransactionRoutes);

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()