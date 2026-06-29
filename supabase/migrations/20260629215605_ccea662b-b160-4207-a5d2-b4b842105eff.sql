
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE TABLE IF NOT EXISTS public.catalog_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.catalog_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.catalog_items TO authenticated;
GRANT ALL ON public.catalog_items TO service_role;

ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view catalog items" ON public.catalog_items;
CREATE POLICY "Anyone can view catalog items"
ON public.catalog_items FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Admins can insert catalog items" ON public.catalog_items;
CREATE POLICY "Admins can insert catalog items"
ON public.catalog_items FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update catalog items" ON public.catalog_items;
CREATE POLICY "Admins can update catalog items"
ON public.catalog_items FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete catalog items" ON public.catalog_items;
CREATE POLICY "Admins can delete catalog items"
ON public.catalog_items FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public read catalog bucket" ON storage.objects;
CREATE POLICY "Public read catalog bucket"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'catalog');

DROP POLICY IF EXISTS "Admins upload to catalog bucket" ON storage.objects;
CREATE POLICY "Admins upload to catalog bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update catalog bucket" ON storage.objects;
CREATE POLICY "Admins update catalog bucket"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete from catalog bucket" ON storage.objects;
CREATE POLICY "Admins delete from catalog bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'));
