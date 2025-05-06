-- Create the saas_student_register table
USE manage_admission;

CREATE TABLE saas_student_register (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cust_id INT NOT NULL,
    course_id INT NOT NULL,
    year_sem_id INT NOT NULL,
    register_session INT NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    mobile VARCHAR(20),
    date_of_birth DATE,
    father_name VARCHAR(255),
    mother_name VARCHAR(255),
    registration_num VARCHAR(100)
    -- Logical links:
    -- cust_id → saas_cust.id
    -- course_id → courses.id
    -- year_sem_id → course_type_yr_sem.id
    -- register_session → session.id
);