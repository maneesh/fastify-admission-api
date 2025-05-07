-- Create the cust_details table
USE manage_admission;

CREATE TABLE cust_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cust_id INT NOT NULL,
    domain VARCHAR(255),
    api_key VARCHAR(255),
    active_session INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: cust_id → saas_cust.id
);