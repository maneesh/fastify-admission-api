-- Create the role_feature table
USE manage_admission;

CREATE TABLE role_feature (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    feature_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: role_id -> role.id
    -- Logical link: feature_id -> feature.id
);