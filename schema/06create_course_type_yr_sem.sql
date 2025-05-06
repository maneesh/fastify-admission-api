-- Create the course_type_yr_sem table
USE manage_admission;

CREATE TABLE course_type_yr_sem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    yr_sem_type ENUM('Year', 'Semester') NOT NULL,
    yr_sem VARCHAR(50) NOT NULL,         -- E.g., "1", "2"
    display_name VARCHAR(100) NOT NULL   -- E.g., "Year 1", "Sem 2"
);