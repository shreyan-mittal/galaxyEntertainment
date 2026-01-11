/*
  # Fix Security Issues

  1. Changes
    - Remove unused index `idx_newsletter_subscribers_is_active`
    - Update RLS policies to add basic validation instead of always true
    - Add email format validation for both tables
    - Add length checks to prevent empty string submissions

  2. Security Improvements
    - Contact form policy now validates:
      * Email contains '@' symbol
      * Name, email, phone, and message are not empty strings
    - Newsletter subscription policy now validates:
      * Email contains '@' symbol
      * Email is not an empty string

  3. Notes
    - These are still public forms (anon can insert)
    - But now with basic data quality validation
    - Auth DB Connection Strategy must be changed manually in dashboard:
      Settings > Database > Connection pooling > Change to percentage-based
*/

-- Drop the unused index
DROP INDEX IF EXISTS idx_newsletter_subscribers_is_active;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;

-- Create improved RLS policy for contact submissions with validation
CREATE POLICY "Anyone can submit valid contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    email LIKE '%@%' AND
    length(trim(name)) > 0 AND
    length(trim(email)) > 0 AND
    length(trim(phone)) > 0 AND
    length(trim(message)) > 0
  );

-- Create improved RLS policy for newsletter subscriptions with validation
CREATE POLICY "Anyone can subscribe with valid email"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (
    email LIKE '%@%' AND
    length(trim(email)) > 0
  );
