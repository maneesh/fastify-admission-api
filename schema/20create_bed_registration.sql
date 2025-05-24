-- Create the bed registration table
USE manage_admission;

CREATE TABLE bed_registration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_no VARCHAR(50) NOT NULL,
    year VARCHAR(10) NOT NULL,
    session_id INT NOT NULL,
    cust_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    fathers_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT
 
);