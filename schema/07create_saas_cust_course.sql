-- Create the saas_cust_course table
USE manage_admission;

CREATE TABLE saas_cust_course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saas_cust_id INT NOT NULL,
    course_id INT NOT NULL,
    course_display VARCHAR(255),       -- E.g., "B.Sc Maths"
    year_sem_type ENUM('Year', 'Semester'),
    reg_enabled BOOLEAN DEFAULT FALSE
    -- Logical link: saas_cust_id → saas_cust.id
    -- Logical link: course_id → courses.id
);