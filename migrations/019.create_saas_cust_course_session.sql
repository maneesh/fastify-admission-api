CREATE TABLE saas_cust_course_session (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saas_cust_course_id INT,
    session_id INT,
    enabled_yr_sem VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT

);