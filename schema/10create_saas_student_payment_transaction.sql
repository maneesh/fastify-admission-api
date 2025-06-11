-- Create the saas_student_payment_transaction table
USE manage_admission;

CREATE TABLE saas_student_payment_transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    register_student_id INT NOT NULL,
    start_date_time DATETIME,
    gateway_transaction_id VARCHAR(255),
    status VARCHAR(100),                 -- e.g., "Success", "Failed", "Pending"
    amount DECIMAL(10,2),
    fee_id INT,
    order_id VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical links:
    -- register_student_id → saas_student_register.id
    -- fee_id → saas_cust_course_fee.id
);