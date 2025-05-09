-- Create the database
CREATE DATABASE IF NOT EXISTS manage_admission;
USE manage_admission;

-- 1 table for schools
CREATE TABLE saas_cust (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- 2 School details
CREATE TABLE cust_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cust_id INT NOT NULL,
    domain VARCHAR(255),
    api_key VARCHAR(255),
    active_session INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: cust_id → saas_cust.id
);

-- 3 Course types (e.g., UG, PG)
CREATE TABLE course_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- 4 All courses
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_type INT NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    years INT NOT NULL,
    semesters INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: course_type → course_types.id
);

-- 5 Academic sessions
CREATE TABLE session (
    id INT AUTO_INCREMENT PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL, -- e.g., 2025–2026
    admission_type ENUM('admission', 'post_admission') NOT NULL,
    start VARCHAR(50),
    end VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- 6 Course structure: year-wise or semester-wise
CREATE TABLE course_type_yr_sem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    yr_sem_type ENUM('Year', 'Semester') NOT NULL,
    yr_sem VARCHAR(50) NOT NULL,         -- E.g., "1", "2"
    display_name VARCHAR(100) NOT NULL,  -- E.g., "Year 1", "Sem 2"
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- 7 Courses assigned to schools
CREATE TABLE saas_cust_course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saas_cust_id INT NOT NULL,
    course_id INT NOT NULL,
    course_display VARCHAR(255),       -- E.g., "B.Sc Maths"
    year_sem_type ENUM('Year', 'Semester'),
    reg_enabled BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: saas_cust_id → saas_cust.id
    -- Logical link: course_id → courses.id
);

-- 8 Course fees per school
CREATE TABLE saas_cust_course_fee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saas_cust_id INT NOT NULL,
    fee_type VARCHAR(100),             -- E.g., "registration", "admission"
    amount DECIMAL(10,2),
    categery VARCHAR(100),
    updated_by VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: saas_cust_id → saas_cust.id
);

-- 9 Student registration details
CREATE TABLE saas_student_register (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cust_id INT NOT NULL,
    course_id INT NOT NULL,
    year_sem_id INT NOT NULL,
    register_session INT NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    mobile VARCHAR(20),
    date_of_birth DATE,
    father_name VARCHAR(255),
    mother_name VARCHAR(255),
    registration_num VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical links:
    -- cust_id → saas_cust.id
    -- course_id → courses.id
    -- year_sem_id → course_type_yr_sem.id
    -- register_session → session.id
);

-- 10 Payment transaction table
CREATE TABLE saas_student_payment_transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    register_student_id INT NOT NULL,
    start_date_time DATETIME,
    gateway_transaction_id VARCHAR(255),
    status VARCHAR(100),                 -- e.g. "Success", "Failed", "Pending"
    amount DECIMAL(10,2),
    fee_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical links:
    -- register_student_id → saas_student_register.id
    -- fee_id → saas_cust_course_fee.id
);

-- Create the app_type table
CREATE TABLE app_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Create the user table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    role_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: role_id -> role.id
);

-- Create the role table
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    app_type_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: app_type_id -> app_type.id
);

-- Create the role_feature table
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

-- Create the feature table
CREATE TABLE feature (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    uri VARCHAR(255),
    app_type INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: app_type -> app_type.id
);

-- Create the saas_cust_user table
CREATE TABLE saas_cust_user (
    user_id INT NOT NULL,
    saas_cust_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
    -- Logical link: user_id -> user.id
    -- Logical link: saas_cust_id -> saas_cust.id
);
