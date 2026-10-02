-- 012_add_down_payment_status.sql
-- Extend transactions status constraint to include DOWN_PAYMENT
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_status_check;
ALTER TABLE transactions ADD CONSTRAINT transactions_status_check 
  CHECK (status IN ('PENDING','WAITING_PAYMENT','DOWN_PAYMENT','PAID','FAILED','EXPIRED','CANCELLED'));
