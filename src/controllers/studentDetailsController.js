const StudentDetails = require('../models/studentDetails');

exports.getAllStudentDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const students = await StudentDetails.getAll(id);
    res.send(students);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving student details' });
  }
};
