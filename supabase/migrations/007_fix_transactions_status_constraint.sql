-- 007_fix_transactions_status_constraint.sql
-- Extend transactions status constraint to include WAITING_PAYMENT
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_status_check;
ALTER TABLE transactions ADD CONSTRAINT transactions_status_check 
  CHECK (status IN ('PENDING','WAITING_PAYMENT','PAID','FAILED','EXPIRED','CANCELLED'));
