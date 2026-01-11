/*
  # Create newsletter subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key) - Unique identifier for each subscriber
      - `email` (text, unique, not null) - Subscriber's email address
      - `name` (text) - Subscriber's name (optional)
      - `subscribed_at` (timestamptz) - Timestamp when they subscribed
      - `is_active` (boolean) - Whether the subscription is active (for unsubscribe functionality)
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for public to insert their own subscription (anyone can subscribe)
    - Admin-only access for reading all subscribers
    
  3. Indexes
    - Unique index on email to prevent duplicate subscriptions
    - Index on is_active for filtering active subscribers
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);
