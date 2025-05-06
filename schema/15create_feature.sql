-- Create the feature table
USE manage_admission;

CREATE TABLE feature (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    uri VARCHAR(255),
    app_type INT
    -- Logical link: app_type -> app_type.id
);