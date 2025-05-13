const Courses = require('../models/Courses');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.getAll();
    res.send(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving courses' });
  }
};

exports.getCoursesById = async (req, res) => {
  try {
    const courses = await Courses.getById(req.params.id);
    if (!courses) {
      return res.status(404).send({ message: 'Courses not found' });
    }
    res.send(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving courses' });
  }
};

exports.createCourses = async (req, res) => {
  try {
    const {course_type, course_name, years, semesters} = req.body
    const courses = await Courses.create(course_type, course_name, years, semesters, req);
    res.status(201).send(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Error creating courses'});
  }
};

exports.updateCourses = async (req, res) => {
  try {
    const courses = await Courses.update(req.params.id, req.body.course_type, req.body.course_name, req.body.years, req.body.semesters, req);
    res.send(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Error updating courses'});
  }
};

exports.deleteCourses = async (req, res) => {
  try {
    await Courses.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting courses' });
  }
};