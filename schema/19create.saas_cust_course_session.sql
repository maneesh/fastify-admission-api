-- Create the saas_cust_user table
USE manage_admission;

CREATE TABLE saas_cust_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saas_cust_course_id INT NOT NULL,
    session_id INT NOT NULL,
    enabled_yr_sem VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT
    -- Logical link: user_id -> user.id
    -- Logical link: saas_cust_id -> saas_cust.id
);