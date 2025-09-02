/*
  # Initial Schema for Balaji Boundary Walls

  1. New Tables
    - `categories` - Product categories with bilingual support
      - `id` (text, primary key)
      - `name_en` (text)
      - `name_hi` (text)
      - `description_en` (text)
      - `description_hi` (text)
      - `created_at` (timestamp)
    
    - `products` - Products with bilingual support
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `name_en` (text)
      - `name_hi` (text)
      - `category_id` (text, foreign key)
      - `image` (text)
      - `specs_en` (text)
      - `specs_hi` (text)
      - `price_range_en` (text)
      - `price_range_hi` (text)
      - `visible` (boolean)
      - `created_at` (timestamp)
    
    - `gallery` - Gallery items with bilingual support
      - `id` (uuid, primary key)
      - `title_en` (text)
      - `title_hi` (text)
      - `image` (text)
      - `location_en` (text)
      - `location_hi` (text)
      - `sqft` (integer)
      - `date` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `faqs` - FAQs with bilingual support
      - `id` (uuid, primary key)
      - `question_en` (text)
      - `question_hi` (text)
      - `answer_en` (text)
      - `answer_hi` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `site_content` - Site content with bilingual support
      - `id` (text, primary key)
      - `hero_headline_en` (text)
      - `hero_headline_hi` (text)
      - `hero_subtext_en` (text)
      - `hero_subtext_hi` (text)
      - `stats_sqft_installed` (integer)
      - `about_text_en` (text)
      - `about_text_hi` (text)
      - `phone` (text)
      - `email` (text)
      - `address_en` (text)
      - `address_hi` (text)
      - `google_map_embed` (text)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access

  3. Storage
    - Create bucket for images with public access
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name_en text NOT NULL,
  name_hi text NOT NULL DEFAULT '',
  description_en text DEFAULT '',
  description_hi text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Categories are editable by authenticated users"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_hi text NOT NULL DEFAULT '',
  category_id text REFERENCES categories(id) ON DELETE CASCADE,
  image text DEFAULT '',
  specs_en text DEFAULT '',
  specs_hi text DEFAULT '',
  price_range_en text DEFAULT '',
  price_range_hi text DEFAULT '',
  visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Products are editable by authenticated users"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_hi text NOT NULL DEFAULT '',
  image text NOT NULL,
  location_en text DEFAULT '',
  location_hi text DEFAULT '',
  sqft integer DEFAULT 0,
  date text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are viewable by everyone"
  ON gallery
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Gallery items are editable by authenticated users"
  ON gallery
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en text NOT NULL,
  question_hi text NOT NULL DEFAULT '',
  answer_en text NOT NULL,
  answer_hi text NOT NULL DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "FAQs are viewable by everyone"
  ON faqs
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "FAQs are editable by authenticated users"
  ON faqs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Site content table
CREATE TABLE IF NOT EXISTS site_content (
  id text PRIMARY KEY DEFAULT 'main',
  hero_headline_en text NOT NULL DEFAULT 'Premium Precast Boundary Walls',
  hero_headline_hi text NOT NULL DEFAULT 'अब तक 1,00,000+ sq ft boundary walls लगा चुके हैं',
  hero_subtext_en text NOT NULL DEFAULT 'Durable. Fast to install. Built to last.',
  hero_subtext_hi text NOT NULL DEFAULT 'टिकाऊ। तेज़ी से इंस्टॉल। लंबे समय तक चलने वाला।',
  stats_sqft_installed integer DEFAULT 100000,
  about_text_en text DEFAULT 'We provide turnkey RCC and precast boundary wall solutions with fast installation and proven durability.',
  about_text_hi text DEFAULT 'हम तेज़ इंस्टॉलेशन और सिद्ध स्थायित्व के साथ टर्नकी RCC और प्रीकास्ट बाउंड्री वॉल समाधान प्रदान करते हैं।',
  phone text DEFAULT '+91 9870839225',
  email text DEFAULT 'info@example.com',
  address_en text DEFAULT 'Plot XX, Industrial Area, Your City',
  address_hi text DEFAULT 'प्लॉट XX, औद्योगिक क्षेत्र, आपका शहर',
  google_map_embed text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site content is viewable by everyone"
  ON site_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Site content is editable by authenticated users"
  ON site_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default site content
INSERT INTO site_content (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true) 
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Images are publicly accessible"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');