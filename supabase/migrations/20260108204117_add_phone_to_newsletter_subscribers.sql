/*
  # Add phone field to newsletter subscribers

  1. Changes
    - Add `phone` column to `newsletter_subscribers` table (optional text field)
    - This allows subscribers to optionally provide their phone number for event notifications
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'newsletter_subscribers' AND column_name = 'phone'
  ) THEN
    ALTER TABLE newsletter_subscribers ADD COLUMN phone text;
  END IF;
END $$;