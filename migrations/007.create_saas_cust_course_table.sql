CREATE TABLE saas_cust_course (
  id INT AUTO_INCREMENT PRIMARY KEY,
  saas_cust_id INT NOT NULL,
  course_id INT NOT NULL,
  course_display VARCHAR(255),
  year_sem_type ENUM('Year', 'Semester'),
  reg_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
);