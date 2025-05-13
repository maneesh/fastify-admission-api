CREATE TABLE saas_student_register (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cust_id INT NOT NULL,
  course_id INT NOT NULL,
  year_sem_id INT NOT NULL,
  register_session INT NOT NULL,
  full_name VARCHAR(255),
  email VARCHAR(255),
  mobile VARCHAR(255),
  date_of_birth DATE,
  father_name VARCHAR(255),
  mother_name VARCHAR(255),
  registration_num VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INTEGER,
  updated_by INTEGER
);