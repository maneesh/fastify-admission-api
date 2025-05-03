-- Create the course_types table
USE manage_admission;

CREATE TABLE course_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50)
);