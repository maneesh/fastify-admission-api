const CourseTypeYrSem = require('../models/CourseTypeYrSem');

exports.getAllCourseTypeYrSems = async (req, res) => {
  try {
    const courseTypeYrSems = await CourseTypeYrSem.getAll();
    res.send(courseTypeYrSems);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving course type yr sems' });
  }
};

exports.getCourseTypeYrSemById = async (req, res) => {
  try {
    const courseTypeYrSem = await CourseTypeYrSem.getById(req.params.id);
    if (!courseTypeYrSem) {
      return res.status(404).send({ message: 'Course type yr sem not found' });
    }
    res.send(courseTypeYrSem);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving course type yr sem' });
  }
};

exports.createCourseTypeYrSem = async (req, res) => {
  try {
    const {yr_sem_type, yr_sem, display_name} = req.body
    const courseTypeYrSem = await CourseTypeYrSem.create(yr_sem_type, yr_sem, display_name, req);
    res.status(201).send(courseTypeYrSem);
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Error creating course type yr sem'});
  }
};

exports.updateCourseTypeYrSem = async (req, res) => {
  try {
    const {yr_sem_type, yr_sem, display_name} = req.body
    const courseTypeYrSem = await CourseTypeYrSem.update(req.params.id, yr_sem_type, yr_sem, display_name, req);
    res.send(courseTypeYrSem);
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Error updating course type yr sem'});
  }
};

exports.deleteCourseTypeYrSem = async (req, res) => {
  try {
    await CourseTypeYrSem.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting course type yr sem' });
  }
};