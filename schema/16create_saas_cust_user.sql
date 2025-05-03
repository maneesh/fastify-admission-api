-- Create the saas_cust_user table
USE manage_admission;

CREATE TABLE saas_cust_user (
    user_id INT NOT NULL,
    saas_cust_id INT NOT NULL
    -- Logical link: user_id -> user.id
    -- Logical link: saas_cust_id -> saas_cust.id
);