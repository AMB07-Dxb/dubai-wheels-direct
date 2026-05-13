
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL DEFAULT 'sedan',
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  fuel TEXT NOT NULL DEFAULT 'Petrol',
  seats INTEGER NOT NULL DEFAULT 5,
  doors INTEGER NOT NULL DEFAULT 4,
  daily NUMERIC NOT NULL DEFAULT 0,
  weekly NUMERIC NOT NULL DEFAULT 0,
  monthly NUMERIC NOT NULL DEFAULT 0,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  description TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cars are viewable by everyone"
  ON public.cars FOR SELECT
  USING (true);

-- No INSERT/UPDATE/DELETE policies: writes go through the admin-cars edge function (service role).

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
