const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAll();
    res.send(students);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving students' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.getById(req.params.id);
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.send(student);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving student' });
  }
};