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
  
 
}


 // Create Student Detail
exports.createStudentDetail = async (req, res) => {
  try {
    const studentData = req.body;


    const newStudent = await StudentDetails.create(studentData, req);

    res.status(201).send({
      message: "Student created successfully",
      data: newStudent
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating student" });
  }
};

// Update Student Detail
exports.updateStudentDetail = async (req, res) => {
  try {
    const { student_id } = req.params;
    const updateData = req.body;

    const updatedStudent = await StudentDetails.update(student_id, updateData, req);

    if (!updatedStudent) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.send({
      message: "Student updated successfully",
      data: updatedStudent
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating student" });
  }
};