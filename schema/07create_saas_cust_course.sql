-- Create the saas_cust_course table
USE manage_admission;

CREATE TABLE saas_cust_course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saas_cust_id INT NOT NULL,
    course_id INT NOT NULL,
    course_display VARCHAR(255),       -- E.g., "B.Sc Maths"
    year_sem_type ENUM('Year', 'Semester'),
    reg_enabled BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: saas_cust_id → saas_cust.id
    -- Logical link: course_id → courses.id
);