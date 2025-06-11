INSERT INTO saas_student_payment_transaction (register_student_id, start_date_time, gateway_transaction_id, status, amount, fee_id,order_id, created_by, updated_by, created_at, updated_at) VALUES
(1, '2025-07-08 10:00:00', 'TXN123', 'Success', 500.00, 1,'ORD123', 1, 1, NOW(), NOW()),
(2, '2025-07-09 11:00:00', 'TXN456', 'Pending', 1000.00, 2,'ORD456' ,1, 1, NOW(), NOW()),
(3, '2025-07-10 12:00:00', 'TXN789', 'Failed', 2000.00, 3,'ORD789',1, 1, NOW(), NOW());