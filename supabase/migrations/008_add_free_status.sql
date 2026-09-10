-- Extend transactions status constraint to include FREE
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_status_check;
ALTER TABLE transactions ADD CONSTRAINT transactions_status_check 
  CHECK (status IN ('PENDING','WAITING_PAYMENT','PAID','FAILED','EXPIRED','CANCELLED','FREE'));
