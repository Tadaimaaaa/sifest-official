-- 006_drop_status_constraint.sql
ALTER TABLE registrations DROP CONSTRAINT IF EXISTS registrations_status_check;
