CREATE TABLE saas_student_payment_transaction (
  id INT AUTO_INCREMENT PRIMARY KEY,
  register_student_id INT NOT NULL,
  start_date_time DATETIME,
  gateway_transaction_id VARCHAR(255),
  status VARCHAR(255),
  amount DECIMAL(10, 2),
  fee_id INT,
  order_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INTEGER,
  updated_by INTEGER
);