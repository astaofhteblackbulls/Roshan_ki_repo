/*
  # Seed Initial Data

  1. Categories
    - Insert default categories with bilingual names
  
  2. Products
    - Insert sample products with bilingual content
  
  3. Gallery
    - Insert sample gallery items
  
  4. FAQs
    - Insert sample FAQs with bilingual content
*/

-- Insert categories
INSERT INTO categories (id, name_en, name_hi, description_en, description_hi) VALUES
('cat-precast', 'Precast Boundary Walls', 'प्रीकास्ट बाउंड्री वॉल', 'Plain, Textured, Barbed-ready', 'सादा, टेक्सचर्ड, कांटेदार तार के लिए तैयार'),
('cat-rcc', 'RCC Poles & Panels', 'RCC पोल और पैनल', '6ft/8ft/10ft variants', '6फीट/8फीट/10फीट विकल्प'),
('cat-compound', 'Compound Walls', 'कंपाउंड वॉल', 'Industrial/Residential', 'औद्योगिक/आवासीय'),
('cat-readymix', 'Readymix Concrete', 'रेडीमिक्स कंक्रीट', 'M20–M35', 'M20–M35'),
('cat-paver', 'Paver Blocks', 'पेवर ब्लॉक', '60/80mm, zig-zag/hex', '60/80mm, ज़िग-ज़ैग/हेक्स')
ON CONFLICT (id) DO NOTHING;

-- Insert products
INSERT INTO products (slug, name_en, name_hi, category_id, image, specs_en, specs_hi, price_range_en, price_range_hi, visible) VALUES
('precast-plain-wall', 'Precast Boundary Wall (Plain)', 'प्रीकास्ट बाउंड्री वॉल (सादा)', 'cat-precast', '/images/precast-plain.png', 'Plain finish, barbed-ready option', 'सादा फिनिश, कांटेदार तार के लिए तैयार विकल्प', '₹300–₹450 per sq ft', '₹300–₹450 प्रति वर्ग फुट', true),
('rcc-poles-8ft', 'RCC Poles (8ft) & Panels', 'RCC पोल (8फीट) और पैनल', 'cat-rcc', '/images/rcc-pole-8ft.png', '8ft poles with interlocking panels', '8फीट पोल इंटरलॉकिंग पैनल के साथ', '₹250–₹380 per sq ft', '₹250–₹380 प्रति वर्ग फुट', true),
('paver-zigzag-80', 'Paver Blocks 80mm Zig-Zag', 'पेवर ब्लॉक 80mm ज़िग-ज़ैग', 'cat-paver', '/images/paver-zigzag-80.png', 'Heavy-duty 80mm, zig-zag', 'हेवी-ड्यूटी 80mm, ज़िग-ज़ैग', '₹38–₹55 per piece', '₹38–₹55 प्रति पीस', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert gallery items
INSERT INTO gallery (title_en, title_hi, location_en, location_hi, sqft, date, image, order_index) VALUES
('Industrial Perimeter', 'औद्योगिक परिधि', 'Manesar', 'मानेसर', 12000, '2024-09-10', '/images/gallery-1.png', 1),
('Residential Compound', 'आवासीय कंपाउंड', 'Gurugram', 'गुरुग्राम', 4500, '2024-06-02', '/images/gallery-2.png', 2),
('Factory Boundary', 'फैक्ट्री बाउंड्री', 'Faridabad', 'फरीदाबाद', 8000, '2025-02-18', '/images/gallery-3.png', 3)
ON CONFLICT (id) DO NOTHING;

-- Insert FAQs
INSERT INTO faqs (question_en, question_hi, answer_en, answer_hi, order_index) VALUES
('Installation time?', 'इंस्टॉलेशन का समय?', 'Typically 1–3 days depending on site and length.', 'आमतौर पर साइट और लंबाई के आधार पर 1-3 दिन।', 1),
('Warranty?', 'वारंटी?', 'Structural warranty up to 5 years on manufacturing defects.', 'निर्माण दोषों पर 5 साल तक की संरचनात्मक वारंटी।', 2),
('Delivery radius?', 'डिलीवरी रेडियस?', 'Pan-city service with logistics coordinated as needed.', 'आवश्यकतानुसार समन्वित लॉजिस्टिक्स के साथ पैन-सिटी सेवा।', 3),
('Foundation requirements?', 'फाउंडेशन आवश्यकताएं?', 'Standard PCC footings; we advise after site inspection.', 'मानक PCC फुटिंग; हम साइट निरीक्षण के बाद सलाह देते हैं।', 4),
('Customization options?', 'कस्टमाइज़ेशन विकल्प?', 'Textured panels, barbed-ready tops, and height variations.', 'टेक्सचर्ड पैनल, कांटेदार तार के लिए तैयार टॉप, और ऊंचाई विविधताएं।', 5),
('Readymix grades?', 'रेडीमिक्स ग्रेड?', 'M20 to M35 with lab certificates available.', 'लैब सर्टिफिकेट के साथ M20 से M35 तक।', 6),
('Paver thickness?', 'पेवर मोटाई?', '60mm for footpaths, 80mm for driveways/heavy load areas.', 'फुटपाथ के लिए 60mm, ड्राइववे/भारी लोड क्षेत्रों के लिए 80mm।', 7),
('Lead time?', 'लीड टाइम?', 'Usually 2–5 days from order confirmation.', 'आमतौर पर ऑर्डर कन्फर्मेशन से 2-5 दिन।', 8)
ON CONFLICT (id) DO NOTHING;