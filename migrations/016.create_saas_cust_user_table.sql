CREATE TABLE saas_cust_user (
  user_id INT NOT NULL,
  saas_cust_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INTEGER,
  updated_by INTEGER,
  PRIMARY KEY (user_id, saas_cust_id)
);