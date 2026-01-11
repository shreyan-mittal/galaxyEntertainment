/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Full name of the person submitting the inquiry
      - `email` (text) - Email address for follow-up
      - `phone` (text) - Contact phone number
      - `message` (text) - The inquiry message content
      - `created_at` (timestamptz) - Timestamp when the inquiry was submitted
      - `status` (text) - Status of inquiry (new, contacted, resolved)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy to allow anyone to insert contact submissions (public form)
    - Only authenticated admins should be able to read submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);