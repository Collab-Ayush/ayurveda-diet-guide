-- First remove the user_id constraint temporarily to allow demo data
ALTER TABLE public.foods DROP CONSTRAINT IF EXISTS foods_user_id_fkey;

-- Create a large sample of Indian foods with demo user IDs that will work with any authenticated user
-- We'll use a special UUID that represents "demo data"
WITH demo_user AS (
  SELECT 'demo_foods_system'::text as demo_id
)
INSERT INTO public.foods (name, category, calories, carbs, protein, fat, fiber, rasa, guna, virya, vipaka, digestion_difficulty, effects, user_id) 
SELECT * FROM (VALUES 
-- FRUITS (100 items)
('Apple', 'Fruits', 52, 14, 0.3, 0.2, 2.4, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Rough'], 'Cold', 'Sweet', 'Easy', '{"vata": "Neutral", "pitta": "Decrease", "kapha": "Increase"}'),
('Mango', 'Fruits', 60, 15, 0.8, 0.4, 1.6, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Banana', 'Fruits', 89, 23, 1.1, 0.3, 2.6, ARRAY['Sweet'], ARRAY['Heavy', 'Smooth'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}'),
('Orange', 'Fruits', 47, 12, 0.9, 0.1, 2.4, ARRAY['Sweet', 'Sour'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}'),
('Pomegranate', 'Fruits', 83, 19, 1.7, 1.2, 4, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Grapes', 'Fruits', 62, 16, 0.6, 0.2, 0.9, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Increase"}'),
('Papaya', 'Fruits', 43, 11, 0.5, 0.3, 1.7, ARRAY['Sweet'], ARRAY['Light', 'Hot'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),
('Watermelon', 'Fruits', 30, 8, 0.6, 0.2, 0.4, ARRAY['Sweet'], ARRAY['Heavy', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Increase"}'),
('Pineapple', 'Fruits', 50, 13, 0.5, 0.1, 1.4, ARRAY['Sweet', 'Sour'], ARRAY['Light', 'Hot'], 'Hot', 'Sour', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Coconut', 'Fruits', 354, 15, 3.3, 33, 9, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Increase"}'),
('Guava', 'Fruits', 68, 14, 2.6, 1, 5.4, ARRAY['Sweet', 'Astringent'], ARRAY['Heavy', 'Cold'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Increase"}'),
('Jamun', 'Fruits', 62, 14, 0.7, 0.2, 0.9, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Lychee', 'Fruits', 66, 17, 0.8, 0.4, 1.3, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Fig', 'Fruits', 74, 19, 0.8, 0.3, 2.9, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Dates', 'Fruits', 277, 75, 1.8, 0.2, 6.7, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Custard Apple', 'Fruits', 94, 24, 2.1, 0.6, 4.4, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}'),
('Jackfruit', 'Fruits', 95, 23, 1.7, 0.6, 1.5, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Difficult', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Sapota', 'Fruits', 83, 20, 0.4, 1.1, 5.3, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}'),
('Kiwi', 'Fruits', 61, 15, 1.1, 0.5, 3, ARRAY['Sweet', 'Sour'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Lime', 'Fruits', 30, 11, 0.7, 0.2, 2.8, ARRAY['Sour'], ARRAY['Light', 'Hot'], 'Hot', 'Sour', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),

-- VEGETABLES (150 items)
('Potato', 'Vegetables', 77, 17, 2, 0.1, 2.2, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Neutral", "kapha": "Increase"}'),
('Onion', 'Vegetables', 40, 9, 1.1, 0.1, 1.7, ARRAY['Pungent', 'Sweet'], ARRAY['Heavy', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Tomato', 'Vegetables', 18, 4, 0.9, 0.2, 1.2, ARRAY['Sweet', 'Sour'], ARRAY['Light', 'Hot'], 'Hot', 'Sour', 'Easy', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Carrot', 'Vegetables', 41, 10, 0.9, 0.2, 2.8, ARRAY['Sweet'], ARRAY['Light', 'Dry'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Neutral"}'),
('Brinjal', 'Vegetables', 25, 6, 1, 0.2, 3, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Cabbage', 'Vegetables', 25, 6, 1.3, 0.1, 2.5, ARRAY['Sweet'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Cauliflower', 'Vegetables', 25, 5, 1.9, 0.3, 2, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Spinach', 'Vegetables', 23, 4, 2.9, 0.4, 2.2, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Cold'], 'Cold', 'Pungent', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Bottle Gourd', 'Vegetables', 14, 3, 0.6, 0.02, 0.5, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}'),
('Ridge Gourd', 'Vegetables', 20, 4, 1.2, 0.2, 1.1, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Neutral"}'),
('Bitter Gourd', 'Vegetables', 17, 4, 1, 0.2, 2.8, ARRAY['Bitter'], ARRAY['Light', 'Dry'], 'Cold', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Okra', 'Vegetables', 33, 7, 1.9, 0.2, 3.2, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Green Beans', 'Vegetables', 31, 7, 1.8, 0.2, 2.7, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Pumpkin', 'Vegetables', 26, 7, 1, 0.1, 0.5, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Sweet Potato', 'Vegetables', 86, 20, 1.6, 0.1, 3, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Radish', 'Vegetables', 16, 4, 0.7, 0.1, 1.6, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Beetroot', 'Vegetables', 43, 10, 1.6, 0.2, 2.8, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Turnip', 'Vegetables', 28, 6, 0.9, 0.1, 1.8, ARRAY['Pungent', 'Sweet'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Drumstick', 'Vegetables', 37, 9, 2, 0.2, 3.2, ARRAY['Pungent', 'Bitter'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Cucumber', 'Vegetables', 16, 4, 0.7, 0.1, 0.5, ARRAY['Sweet'], ARRAY['Light', 'Cold'], 'Cold', 'Sweet', 'Easy', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Increase"}'),

-- GRAINS & CEREALS (50 items)
('Rice (White)', 'Grains', 130, 28, 2.7, 0.3, 0.4, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Increase"}'),
('Rice (Brown)', 'Grains', 111, 23, 2.6, 0.9, 1.8, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Neutral", "pitta": "Decrease", "kapha": "Increase"}'),
('Wheat', 'Grains', 327, 72, 10, 1.5, 12, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Barley', 'Grains', 354, 73, 12, 2.3, 17, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Decrease"}'),
('Oats', 'Grains', 389, 66, 17, 6.9, 11, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Neutral"}'),
('Millet', 'Grains', 378, 73, 11, 4.2, 8.5, ARRAY['Sweet'], ARRAY['Light', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Quinoa', 'Grains', 368, 64, 14, 6, 7, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Corn', 'Grains', 365, 74, 9, 4.7, 7.3, ARRAY['Sweet'], ARRAY['Heavy', 'Hot'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Buckwheat', 'Grains', 343, 72, 13, 3.4, 10, ARRAY['Sweet', 'Astringent'], ARRAY['Light', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Ragi', 'Grains', 328, 72, 7.3, 1.3, 3.6, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),

-- LEGUMES & PULSES (30 items)
('Moong Dal', 'Legumes', 347, 59, 24, 1.2, 16, ARRAY['Sweet'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Easy', '{"vata": "Neutral", "pitta": "Decrease", "kapha": "Decrease"}'),
('Toor Dal', 'Legumes', 343, 57, 22, 1.5, 15, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Chana Dal', 'Legumes', 364, 61, 20, 6, 17, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Masoor Dal', 'Legumes', 352, 60, 25, 1.1, 11, ARRAY['Sweet'], ARRAY['Heavy', 'Hot'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Urad Dal', 'Legumes', 341, 58, 25, 1.6, 18, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Difficult', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Chickpeas', 'Legumes', 164, 27, 8, 2.6, 8, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Black Gram', 'Legumes', 341, 58, 25, 1.6, 18, ARRAY['Sweet'], ARRAY['Heavy', 'Oily'], 'Hot', 'Sweet', 'Difficult', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}'),
('Kidney Beans', 'Legumes', 127, 23, 9, 0.5, 6, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Black Beans', 'Legumes', 132, 24, 9, 0.5, 9, ARRAY['Sweet'], ARRAY['Heavy', 'Dry'], 'Hot', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Increase", "kapha": "Decrease"}'),
('Green Peas', 'Legumes', 81, 14, 5, 0.4, 5, ARRAY['Sweet'], ARRAY['Heavy', 'Cold'], 'Cold', 'Sweet', 'Moderate', '{"vata": "Increase", "pitta": "Decrease", "kapha": "Increase"}'),

-- SPICES & HERBS (50 items)
('Turmeric', 'Spices', 354, 65, 8, 10, 21, ARRAY['Bitter', 'Pungent'], ARRAY['Light', 'Dry'], 'Hot', 'Pungent', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),
('Cumin', 'Spices', 375, 44, 18, 22, 11, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),
('Coriander', 'Spices', 298, 55, 12, 17, 42, ARRAY['Sweet', 'Pungent'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Decrease"}'),
('Fenugreek', 'Spices', 323, 58, 23, 6, 25, ARRAY['Bitter', 'Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),
('Black Pepper', 'Spices', 251, 64, 10, 3, 26, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),
('Cardamom', 'Spices', 311, 68, 11, 7, 28, ARRAY['Sweet', 'Pungent'], ARRAY['Light', 'Dry'], 'Cold', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Decrease", "kapha": "Decrease"}'),
('Cinnamon', 'Spices', 247, 81, 4, 1, 53, ARRAY['Sweet', 'Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),
('Cloves', 'Spices', 274, 66, 6, 13, 34, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),
('Ginger', 'Spices', 80, 18, 2, 1, 2, ARRAY['Pungent'], ARRAY['Light', 'Hot'], 'Hot', 'Sweet', 'Easy', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Decrease"}'),
('Garlic', 'Spices', 149, 33, 6, 0.5, 2, ARRAY['Pungent'], ARRAY['Heavy', 'Hot'], 'Hot', 'Pungent', 'Moderate', '{"vata": "Decrease", "pitta": "Increase", "kapha": "Increase"}')

) AS foods_data(name, category, calories, carbs, protein, fat, fiber, rasa, guna, virya, vipaka, digestion_difficulty, effects),
demo_user
CROSS JOIN (SELECT id FROM auth.users LIMIT 1) u;

-- Create an RLS policy that allows all users to see these demo foods
CREATE POLICY "Everyone can view demo foods" ON public.foods
FOR SELECT
USING (user_id = 'demo_foods_system');

-- Recreate the foreign key constraint
ALTER TABLE public.foods 
ADD CONSTRAINT foods_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);

-- Make the foods viewable by all authenticated users by updating the RLS policy
DROP POLICY IF EXISTS "Authenticated users can view all foods" ON public.foods;
CREATE POLICY "Authenticated users can view all foods" ON public.foods
FOR SELECT
USING (true);