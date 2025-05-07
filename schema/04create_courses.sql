-- Create the courses table
USE manage_admission;

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_type INT NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    years INT NOT NULL,
    semesters INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: course_type → course_types.id
);