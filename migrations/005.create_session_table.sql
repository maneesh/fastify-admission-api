CREATE TABLE session (
  id INT AUTO_INCREMENT PRIMARY KEY,
  academic_year VARCHAR(255) NOT NULL,
  admission_type ENUM('admission', 'post_admission') NOT NULL,
  start VARCHAR(255),
  end VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INTEGER,
  updated_by INTEGER
);