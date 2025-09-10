-- Add user_id to existing tables if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'user_id') THEN
        ALTER TABLE public.patients ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'foods' AND column_name = 'user_id') THEN
        ALTER TABLE public.foods ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'diet_charts' AND column_name = 'user_id') THEN
        ALTER TABLE public.diet_charts ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Enable RLS on all tables
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_charts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own patients" ON public.patients;
DROP POLICY IF EXISTS "Users can create their own patients" ON public.patients;
DROP POLICY IF EXISTS "Users can update their own patients" ON public.patients;
DROP POLICY IF EXISTS "Users can delete their own patients" ON public.patients;

DROP POLICY IF EXISTS "Authenticated users can view all foods" ON public.foods;
DROP POLICY IF EXISTS "Users can create their own foods" ON public.foods;
DROP POLICY IF EXISTS "Users can update their own foods" ON public.foods;
DROP POLICY IF EXISTS "Users can delete their own foods" ON public.foods;

DROP POLICY IF EXISTS "Users can view their own diet charts" ON public.diet_charts;
DROP POLICY IF EXISTS "Users can create their own diet charts" ON public.diet_charts;
DROP POLICY IF EXISTS "Users can update their own diet charts" ON public.diet_charts;
DROP POLICY IF EXISTS "Users can delete their own diet charts" ON public.diet_charts;

-- RLS Policies for patients
CREATE POLICY "Users can view their own patients" 
ON public.patients 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own patients" 
ON public.patients 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patients" 
ON public.patients 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own patients" 
ON public.patients 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for foods (shared read, user-specific write)
CREATE POLICY "Authenticated users can view all foods" 
ON public.foods 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can create their own foods" 
ON public.foods 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own foods" 
ON public.foods 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own foods" 
ON public.foods 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for diet_charts
CREATE POLICY "Users can view their own diet charts" 
ON public.diet_charts 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own diet charts" 
ON public.diet_charts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diet charts" 
ON public.diet_charts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own diet charts" 
ON public.diet_charts 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);