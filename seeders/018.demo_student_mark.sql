INSERT INTO student_mark (
    standard,
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
('10th Class','UP', '123456', 2022, 1, 'Mathematics,Hindi,English,Social Science,Science,Computer', 600, 510, 85.00, 1, 1, NOW(), NOW()),
('12th Class','UP', '123458', 2024, 1, 'Mathematics,Hindi,English,Chemistry,Physics', 500, 410, 82.00, 1, 1, NOW(), NOW()),
('Graduation','UP', '1234576', 2028, 1, 'Java,C,Python,Electrical,OOps', 500, 410, 82.00, 1, 1, NOW(), NOW()),
('10th Class','ICSE', '789012', 2021, 3, 'Mathematics,Hindi,English,Social Science,Science,Computer', 600, 500, 83.33, 1, 1, NOW(), NOW()),
('12th Class','ICSE', '789019', 2023, 3, 'Physics,Chemistry,Maths,Hindi,English', 500, 400, 80.00, 1, 1, NOW(), NOW());
