INSERT INTO student_mark (
    board_name,
    roll_no,
    passing_year,
    student_id,
    subject_name,
    max_marks,
    marks_obtained,
    percentage,
    created_by,
    updated_by,
    created_at,
    updated_at
) VALUES 
('CBSE', '123456', 2022, 1, 'Mathematics,Hindi,English', 100, 85, 85.00, 1, 1, NOW(), NOW()),
('ICSE', '789012', 2021, 3, 'Science', 100, 90, 90.00, 1, 1, NOW(), NOW());
