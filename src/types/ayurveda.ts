export type PrakritiType = 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshic';

export type Rasa = 'Sweet' | 'Sour' | 'Salty' | 'Pungent' | 'Bitter' | 'Astringent';
export type Guna = 'Heavy' | 'Light' | 'Oily' | 'Dry' | 'Hot' | 'Cold' | 'Smooth' | 'Rough';
export type Virya = 'Hot' | 'Cold';
export type Vipaka = 'Sweet' | 'Sour' | 'Pungent';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number; // in cm
  weight: number; // in kg
  prakriti: PrakritiType;
  medicalConditions: string[];
  bowelMovements: 'Regular' | 'Irregular' | 'Constipated';
  waterIntake: number; // liters per day
  lifestyle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  calories: number; // per 100g
  carbs: number; // grams per 100g
  protein: number; // grams per 100g
  fat: number; // grams per 100g
  fiber: number; // grams per 100g
  rasa: Rasa[];
  guna: Guna[];
  virya: Virya;
  vipaka: Vipaka;
  digestionDifficulty: 'Easy' | 'Moderate' | 'Difficult';
  effects: {
    vata: 'Increase' | 'Decrease' | 'Neutral';
    pitta: 'Increase' | 'Decrease' | 'Neutral';
    kapha: 'Increase' | 'Decrease' | 'Neutral';
  };
}

export interface DietChart {
  id: string;
  patientId: string;
  dietitianId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  meals: Meal[];
  notes: string;
  createdAt: Date;
}

export interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  foods: FoodPortion[];
  timing: string;
  instructions: string;
}

export interface FoodPortion {
  foodId: string;
  quantity: number; // in grams
  food?: FoodItem;
}

export interface NutritionSummary {
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  totalFiber: number;
}

export interface AyurvedicRule {
  id: string;
  condition: string;
  action: 'Avoid' | 'Prefer' | 'Limit';
  foodCategories: string[];
  description: string;
  prakritiTarget?: PrakritiType[];
}