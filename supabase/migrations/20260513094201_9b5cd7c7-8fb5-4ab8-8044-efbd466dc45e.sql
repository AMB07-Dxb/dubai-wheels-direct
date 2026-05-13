
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Featured',
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  daily NUMERIC NOT NULL DEFAULT 0,
  weekly NUMERIC NOT NULL DEFAULT 0,
  monthly NUMERIC NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hero slides are viewable by everyone"
  ON public.hero_slides FOR SELECT
  USING (true);

CREATE TRIGGER update_hero_slides_updated_at
BEFORE UPDATE ON public.hero_slides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
