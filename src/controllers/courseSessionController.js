const CourseSession = require('../models/courseSession');

exports.getAllCourseSession = async (req, res) => {
  try {
    const session = await CourseSession.getAll();
    res.send(session);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving course sessions' });
  }
};

exports.createCourseSession = async (req, res) => {
    try {
      const {saas_cust_course_id, session_id,enabled_yr_sem} = req.body;
      const session = await CourseSession.create(saas_cust_course_id, session_id,enabled_yr_sem, req);
      res.status(201).send(session);
    } catch (err) {
      console.error(err);
      res.status(500).send({message: 'Error creating course session'});
    }
  };

  exports.updateCourseSession = async (req, res) => {
    try {
      const { id } = req.params; // ID from route param
      const { saas_cust_course_id, session_id, enabled_yr_sem } = req.body;
  
      const updated = await CourseSession.update(
        id,
        saas_cust_course_id,
        session_id,
        enabled_yr_sem,
        req
      );
  
      res.status(200).send(updated);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error updating course session' });
    }
  };
  