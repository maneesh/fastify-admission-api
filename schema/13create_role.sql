-- Create the role table
USE manage_admission;

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    app_type_id INT
    -- Logical link: app_type_id -> app_type.id
);