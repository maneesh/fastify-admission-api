-- Create the saas_cust_course_fee table
USE manage_admission;

CREATE TABLE saas_cust_course_fee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saas_cust_id INT NOT NULL,
    fee_type VARCHAR(100),             -- E.g., "registration", "admission"
    amount DECIMAL(10,2),
    categery VARCHAR(100),
    updated_by VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: saas_cust_id → saas_cust.id
);