-- Create the session table
USE manage_admission;

CREATE TABLE session (
    id INT AUTO_INCREMENT PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL, -- e.g., 2025–2026
    admission_type ENUM('admission', 'post_admission') NOT NULL,
    start VARCHAR(50),
    end VARCHAR(50)
);