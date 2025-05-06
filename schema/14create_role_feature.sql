-- Create the role_feature table
USE manage_admission;

CREATE TABLE role_feature (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    feature_id INT NOT NULL
    -- Logical link: role_id -> role.id
    -- Logical link: feature_id -> feature.id
);