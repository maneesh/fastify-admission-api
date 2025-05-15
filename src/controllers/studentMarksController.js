const StudentMarks = require('../models/studentMarks');

exports.getAllStudentMarks = async (req, res) => {
  try {
    const {id} = req.params;
    const marks = await StudentMarks.getAll(id);
    res.send(marks);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving student marks' });
  }
};
