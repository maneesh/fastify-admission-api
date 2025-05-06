const CourseTypes = require('../models/CourseTypes');

exports.getAllCourseTypes = async (req, res) => {
  try {
    const courseTypes = await CourseTypes.getAll();
    res.send(courseTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving course types' });
  }
};

exports.getCourseTypesById = async (req, res) => {
  try {
    const courseTypes = await CourseTypes.getById(req.params.id);
    if (!courseTypes) {
      return res.status(404).send({ message: 'Course types not found' });
    }
    res.send(courseTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving course types' });
  }
};

exports.createCourseTypes = async (req, res) => {
  try {
    const courseTypes = await CourseTypes.create(req.body.name, req.body.short_name);
    res.status(201).send(courseTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating course types' });
  }
};

exports.updateCourseTypes = async (req, res) => {
  try {
    const courseTypes = await CourseTypes.update(req.params.id, req.body.name, req.body.short_name);
    res.send(courseTypes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating course types' });
  }
};

exports.deleteCourseTypes = async (req, res) => {
  try {
    await CourseTypes.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting course types' });
  }
};