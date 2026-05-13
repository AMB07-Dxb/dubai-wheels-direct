
-- Customers table for users that sign up on the website
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  country_code TEXT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to register (insert) — admin reads via service-role only
CREATE POLICY "Anyone can sign up"
  ON public.customers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Deny client-side reads; admin will read via edge function with service role
-- (no SELECT policy means no rows visible to anon/authenticated)

CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for car images uploaded from the admin
INSERT INTO storage.buckets (id, name, public)
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read of car images
CREATE POLICY "Public read car images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'car-images');

-- Allow uploads/updates/deletes from anyone (admin gates via edge function in practice;
-- but client-side AdminPage uploads with anon key, so we allow it for this bucket).
CREATE POLICY "Anyone can upload car images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'car-images');

CREATE POLICY "Anyone can update car images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'car-images');

CREATE POLICY "Anyone can delete car images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'car-images');
