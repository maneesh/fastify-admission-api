CREATE TABLE student_mark (
    id INT AUTO_INCREMENT PRIMARY KEY,
    board_name VARCHAR(100),
    roll_no VARCHAR(50),
    passing_year YEAR,
    student_id INT,
    subject_name VARCHAR(100),
    max_marks INT,
    marks_obtained INT,
    percentage DECIMAL(5,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT

);