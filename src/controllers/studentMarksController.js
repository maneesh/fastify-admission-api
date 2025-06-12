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


exports.createStudentMark = async (req, res) => {
  try {
    const data = req.body;
    const newMark = await StudentMarks.create(data);
    res.status(201).send({
      message: "Student mark added successfully",
      data: newMark,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding student mark" });
  }
};
