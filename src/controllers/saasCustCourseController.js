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
    const saas_cust_id = req?.user?.cust_id;  // From auth
    const reg_enabled = true; 
    const { course_id, course_display, year_sem_type } = req.body;

    const saasCustCourse = await SaasCustCourse.create(
      saas_cust_id,
      course_id,
      course_display,
      year_sem_type,
      reg_enabled
    );

    res.status(200).send(saasCustCourse);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating saas cust course' });
  }
};

exports.updateSaasCustCourse = async (req, res) => {
  try {
    const {id} = req.params;
    const saas_cust_id = req?.user?.cust_id;
    const { course_id, course_display, year_sem_type} = req.body;

    const saasCustCourse = await SaasCustCourse.update(
      id,
      saas_cust_id,
      course_id,
      course_display,
      year_sem_type,
    );

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