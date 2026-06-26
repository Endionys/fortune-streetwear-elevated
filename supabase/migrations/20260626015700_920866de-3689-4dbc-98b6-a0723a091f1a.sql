
CREATE POLICY "Public can read catalog images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'catalog');

CREATE POLICY "Admins can upload catalog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update catalog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete catalog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'));
