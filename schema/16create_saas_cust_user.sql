-- Create the saas_cust_user table
USE manage_admission;

CREATE TABLE saas_cust_user (
    user_id INT NOT NULL,
    saas_cust_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: user_id -> user.id
    -- Logical link: saas_cust_id -> saas_cust.id
);