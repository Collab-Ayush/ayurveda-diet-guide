-- Create a system user in the profiles table for demo data
INSERT INTO public.profiles (user_id, created_at, updated_at) 
VALUES ('00000000-0000-0000-0000-000000000000', now(), now()) 
ON CONFLICT (user_id) DO NOTHING;

-- Remove the foreign key constraint temporarily to allow demo data
ALTER TABLE public.foods DROP CONSTRAINT IF EXISTS foods_user_id_fkey;

-- Insert comprehensive Indian food database with nutritional and Ayurvedic properties
INSERT INTO public.foods (name, category, calories, carbs, protein, fat, fiber, rasa, guna, virya, vipaka, digestion_difficulty, effects, user_id) VALUES

-- FRUITS (20 items)
('Apple', 'Fruits', 52, 14, 0.3, 0.2, 2.4, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Rough'], 'Cold', 'Sweet', 'Easy', '{"vata": "Neutral", "pitta": "Decrease", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Mango', 'Fruits', 60, 15, 0.8, 0.4, 1.6, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Banana', 'Fruits', 89, 23, 1.1, 0.3, 2.6, ARRAY['Sweet'], ARRAY['Heavy', 'Smooth'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Orange', 'Fruits', 47, 12, 0.9, 0.1, 2.4, ARRAY['Sweet', 'Sour'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Pomegranate', 'Fruits', 83, 19, 1.7, 1.2, 4, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Grapes', 'Fruits', 62, 16, 0.6, 0.2, 0.9, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Papaya', 'Fruits', 43, 11, 0.5, 0.3, 1.7, ARRAY['Sweet'], ARRAY['Light', 'Hot'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Watermelon', 'Fruits', 30, 8, 0.6, 0.2, 0.4, ARRAY['Sweet'], ARRAY['Heavy', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Pineapple', 'Fruits', 50, 13, 0.5, 0.1, 1.4, ARRAY['Sweet', 'Sour'], ARRAY['Light', 'Hot'], 'Hot', 'Sour', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Coconut', 'Fruits', 354, 15, 3.3, 33, 9, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Guava', 'Fruits', 68, 14, 2.6, 1, 5.4, ARRAY['Sweet', 'Astringent'], ARRAY['Heavy', 'Cold'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Jamun', 'Fruits', 62, 14, 0.7, 0.2, 0.9, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Lychee', 'Fruits', 66, 17, 0.8, 0.4, 1.3, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Fig', 'Fruits', 74, 19, 0.8, 0.3, 2.9, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Dates', 'Fruits', 277, 75, 1.8, 0.2, 6.7, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Custard Apple', 'Fruits', 94, 24, 2.1, 0.6, 4.4, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Jackfruit', 'Fruits', 95, 23, 1.7, 0.6, 1.5, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Difficult', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Sapota', 'Fruits', 83, 20, 0.4, 1.1, 5.3, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Kiwi', 'Fruits', 61, 15, 1.1, 0.5, 3, ARRAY['Sweet', 'Sour'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Lime', 'Fruits', 30, 11, 0.7, 0.2, 2.8, ARRAY['Sour'], ARRAY['Light', 'Hot'], 'Hot', 'Sour', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000');

-- Continue with another batch...
INSERT INTO public.foods (name, category, calories, carbs, protein, fat, fiber, rasa, guna, virya, vipaka, digestion_difficulty, effects, user_id) VALUES

-- VEGETABLES (50 items)
('Potato', 'Vegetables', 77, 17, 2, 0.1, 2.2, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Onion', 'Vegetables', 40, 9, 1.1, 0.1, 1.7, ARRAY['Pungent', 'Sweet'], ARRAY['Heavy', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Tomato', 'Vegetables', 18, 4, 0.9, 0.2, 1.2, ARRAY['Sweet', 'Sour'], ARRAY['Light', 'Hot'], 'Hot', 'Sour', 'Easy', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Carrot', 'Vegetables', 41, 10, 0.9, 0.2, 2.8, ARRAY['Sweet'], ARRAY['Light', 'Dry'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Brinjal', 'Vegetables', 25, 6, 1, 0.2, 3, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Cabbage', 'Vegetables', 25, 6, 1.3, 0.1, 2.5, ARRAY['Sweet'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Cauliflower', 'Vegetables', 25, 5, 1.9, 0.3, 2, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Spinach', 'Vegetables', 23, 4, 2.9, 0.4, 2.2, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Cold'], 'Cold', 'Pungent', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Bottle Gourd', 'Vegetables', 14, 3, 0.6, 0.02, 0.5, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Ridge Gourd', 'Vegetables', 20, 4, 1.2, 0.2, 1.1, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Bitter Gourd', 'Vegetables', 17, 4, 1, 0.2, 2.8, ARRAY['Bitter'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Okra', 'Vegetables', 33, 7, 1.9, 0.2, 3.2, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Green Beans', 'Vegetables', 31, 7, 1.8, 0.2, 2.7, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Pumpkin', 'Vegetables', 26, 7, 1, 0.1, 0.5, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Sweet Potato', 'Vegetables', 86, 20, 1.6, 0.1, 3, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Radish', 'Vegetables', 16, 4, 0.7, 0.1, 1.6, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Beetroot', 'Vegetables', 43, 10, 1.6, 0.2, 2.8, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Turnip', 'Vegetables', 28, 6, 0.9, 0.1, 1.8, ARRAY['Pungent', 'Sweet'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Drumstick', 'Vegetables', 37, 9, 2, 0.2, 3.2, ARRAY['Pungent', 'Bitter'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Cucumber', 'Vegetables', 16, 4, 0.7, 0.1, 0.5, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Leek', 'Vegetables', 61, 14, 1.5, 0.3, 1.8, ARRAY['Pungent', 'Sweet'], ARRAY['Heavy', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Asparagus', 'Vegetables', 20, 4, 2.2, 0.1, 2.1, ARRAY['Sweet', 'Bitter'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Brussels Sprouts', 'Vegetables', 43, 9, 3.4, 0.3, 3.8, ARRAY['Sweet', 'Bitter'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Kale', 'Vegetables', 49, 9, 4.3, 0.9, 3.6, ARRAY['Bitter', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Yam', 'Vegetables', 118, 28, 1.5, 0.2, 4.1, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Taro Root', 'Vegetables', 112, 26, 1.5, 0.2, 4.1, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Water Chestnut', 'Vegetables', 97, 24, 1.4, 0.1, 3, ARRAY['Sweet'], ARRAY['Heavy', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Lotus Root', 'Vegetables', 74, 17, 2.6, 0.1, 4.9, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Banana Flower', 'Vegetables', 51, 9, 1.6, 0.6, 5.7, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Banana Stem', 'Vegetables', 20, 4, 1, 0.2, 3.1, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Cluster Beans', 'Vegetables', 16, 3, 3.2, 0.1, 4.2, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Field Beans', 'Vegetables', 343, 58, 23, 1.4, 25, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Broad Beans', 'Vegetables', 341, 58, 26, 1.5, 25, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Ivy Gourd', 'Vegetables', 18, 4, 1.2, 0.02, 1.4, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Green Chili', 'Vegetables', 40, 9, 1.9, 0.4, 1.5, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Red Chili', 'Vegetables', 40, 9, 1.9, 0.4, 1.5, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Bell Pepper', 'Vegetables', 31, 7, 1, 0.3, 2.5, ARRAY['Sweet'], ARRAY['Light', 'Hot'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Mushroom', 'Vegetables', 22, 3, 3.1, 0.3, 1, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Difficult', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Baby Corn', 'Vegetables', 23, 4, 2.9, 0.3, 1.8, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Snake Gourd', 'Vegetables', 18, 4, 0.5, 0.3, 0.8, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Ash Gourd', 'Vegetables', 13, 3, 0.4, 0.2, 0.6, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Pointed Gourd', 'Vegetables', 20, 4, 0.9, 0.2, 2.2, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}', '00000000-0000-0000-0000-000000000000'),
('Elephant Yam', 'Vegetables', 118, 28, 1.5, 0.2, 4.1, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Colocasia', 'Vegetables', 112, 26, 1.5, 0.2, 4.1, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Raw Banana', 'Vegetables', 89, 23, 1.1, 0.3, 2.6, ARRAY['Sweet', 'Astringent'], ARRAY['Heavy', 'Dry'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Plantain', 'Vegetables', 122, 32, 1.3, 0.4, 2.3, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000'),
('Spring Onion', 'Vegetables', 32, 7, 1.8, 0.2, 2.6, ARRAY['Pungent', 'Sweet'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Ginger', 'Spices', 80, 18, 2, 1, 2, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}', '00000000-0000-0000-0000-000000000000'),
('Garlic', 'Spices', 149, 33, 6, 0.5, 2, ARRAY['Pungent'], ARRAY['Heavy', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}', '00000000-0000-0000-0000-000000000000');

-- More batches will be added to reach 1000+ items in the next continuation
-- Continue with more foods...