
const CourseType = require("../models/CourseTypes");


// GET all users
exports.getCourseType = async (req, res) => {
  try {
    const course = await CourseType.getAll();
    res.status(200).send(course);
  } catch (err) {
    console.error("Get Course Type Error:", err.message);
    res.status(500).send({ message: "Error retrieving course type" });
  }
};
