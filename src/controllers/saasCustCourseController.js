const SaasCustCourse = require('../models/SaasCustCourse');

exports.getAllSaasCustCourses = async (req, res) => {
  try {
    const saasCustCourses = await SaasCustCourse.getAll();
    res.send(saasCustCourses);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas cust courses' });
  }
};

exports.getSaasCustCourseById = async (req, res) => {
  try {
    const saasCustCourse = await SaasCustCourse.getById(req.params.id);
    if (!saasCustCourse) {
      return res.status(404).send({ message: 'Saas cust course not found' });
    }
    res.send(saasCustCourse);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving saas cust course' });
  }
};

exports.createSaasCustCourse = async (req, res) => {
  try {
    const saasCustCourse = await SaasCustCourse.create(req.body.saas_cust_id, req.body.course_id, req.body.course_display, req.body.year_sem_type, req.body.reg_enabled);
    res.status(201).send(saasCustCourse);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating saas cust course' });
  }
};

exports.updateSaasCustCourse = async (req, res) => {
  try {
    const saasCustCourse = await SaasCustCourse.update(req.params.id, req.body.saas_cust_id, req.body.course_id, req.body.course_display, req.body.year_sem_type, req.body.reg_enabled);
    res.send(saasCustCourse);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating saas cust course' });
  }
};

exports.deleteSaasCustCourse = async (req, res) => {
  try {
    await SaasCustCourse.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting saas cust course' });
  }
};