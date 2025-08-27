import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';
import { FoodItem, Rasa, Virya } from '@/types/ayurveda';

// Mock food database
const mockFoods: FoodItem[] = [
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'Grains',
    calories: 130,
    carbs: 28,
    protein: 2.7,
    fat: 0.3,
    fiber: 0.4,
    rasa: ['Sweet'],
    guna: ['Light', 'Dry'],
    virya: 'Cold',
    vipaka: 'Sweet',
    digestionDifficulty: 'Easy',
    effects: { vata: 'Neutral', pitta: 'Decrease', kapha: 'Increase' }
  },
  {
    id: '2',
    name: 'Turmeric',
    category: 'Spices',
    calories: 312,
    carbs: 67,
    protein: 9.7,
    fat: 3.2,
    fiber: 22.7,
    rasa: ['Bitter', 'Pungent'],
    guna: ['Light', 'Dry', 'Rough'],
    virya: 'Hot',
    vipaka: 'Pungent',
    digestionDifficulty: 'Easy',
    effects: { vata: 'Neutral', pitta: 'Increase', kapha: 'Decrease' }
  },
  {
    id: '3',
    name: 'Ghee',
    category: 'Dairy',
    calories: 900,
    carbs: 0,
    protein: 0,
    fat: 100,
    fiber: 0,
    rasa: ['Sweet'],
    guna: ['Heavy', 'Oily', 'Smooth'],
    virya: 'Cold',
    vipaka: 'Sweet',
    digestionDifficulty: 'Easy',
    effects: { vata: 'Decrease', pitta: 'Decrease', kapha: 'Increase' }
  },
  {
    id: '4',
    name: 'Ginger',
    category: 'Spices',
    calories: 80,
    carbs: 18,
    protein: 1.8,
    fat: 0.8,
    fiber: 2,
    rasa: ['Pungent'],
    guna: ['Light', 'Oily', 'Hot'],
    virya: 'Hot',
    vipaka: 'Sweet',
    digestionDifficulty: 'Easy',
    effects: { vata: 'Decrease', pitta: 'Increase', kapha: 'Decrease' }
  },
  {
    id: '5',
    name: 'Almonds',
    category: 'Nuts',
    calories: 576,
    carbs: 22,
    protein: 21,
    fat: 50,
    fiber: 12,
    rasa: ['Sweet'],
    guna: ['Heavy', 'Oily', 'Smooth'],
    virya: 'Hot',
    vipaka: 'Sweet',
    digestionDifficulty: 'Moderate',
    effects: { vata: 'Decrease', pitta: 'Increase', kapha: 'Increase' }
  },
];

const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Dairy', 'Nuts', 'Spices', 'Legumes'];

const getRasaColor = (rasa: Rasa) => {
  const colors: Record<Rasa, string> = {
    'Sweet': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Sour': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Salty': 'bg-blue-100 text-blue-800 border-blue-200',
    'Pungent': 'bg-red-100 text-red-800 border-red-200',
    'Bitter': 'bg-purple-100 text-purple-800 border-purple-200',
    'Astringent': 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[rasa];
};

const getEffectColor = (effect: 'Increase' | 'Decrease' | 'Neutral') => {
  if (effect === 'Increase') return 'text-red-600';
  if (effect === 'Decrease') return 'text-green-600';
  return 'text-gray-600';
};

const getEffectSymbol = (effect: 'Increase' | 'Decrease' | 'Neutral') => {
  if (effect === 'Increase') return '↑';
  if (effect === 'Decrease') return '↓';
  return '→';
};

export default function Foods() {
  const [foods, setFoods] = useState<FoodItem[]>(mockFoods);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Food Database</h1>
          <p className="text-muted-foreground">
            Comprehensive food items with nutritional and Ayurvedic properties
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Add Food Item
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-soft border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search foods by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-background border-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <Card key={food.id} className="shadow-soft border-border hover:shadow-card transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{food.name}</CardTitle>
                  <CardDescription>{food.category}</CardDescription>
                </div>
                <Badge 
                  className={
                    food.digestionDifficulty === 'Easy' ? 'bg-green-100 text-green-800 border-green-200' :
                    food.digestionDifficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  }
                >
                  {food.digestionDifficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Nutritional Info */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Nutrition (per 100g)</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Calories:</span>
                    <span className="font-medium text-foreground">{food.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carbs:</span>
                    <span className="font-medium text-foreground">{food.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein:</span>
                    <span className="font-medium text-foreground">{food.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fat:</span>
                    <span className="font-medium text-foreground">{food.fat}g</span>
                  </div>
                </div>
              </div>

              {/* Ayurvedic Properties */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Rasa (Taste)</p>
                <div className="flex flex-wrap gap-1">
                  {food.rasa.map((rasa, index) => (
                    <Badge key={index} className={getRasaColor(rasa)}>
                      {rasa}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Virya</p>
                  <p className="font-medium text-foreground">{food.virya}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Vipaka</p>
                  <p className="font-medium text-foreground">{food.vipaka}</p>
                </div>
              </div>

              {/* Dosha Effects */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Dosha Effects</p>
                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Vata</p>
                    <p className={`font-medium ${getEffectColor(food.effects.vata)}`}>
                      {getEffectSymbol(food.effects.vata)} {food.effects.vata}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Pitta</p>
                    <p className={`font-medium ${getEffectColor(food.effects.pitta)}`}>
                      {getEffectSymbol(food.effects.pitta)} {food.effects.pitta}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Kapha</p>
                    <p className={`font-medium ${getEffectColor(food.effects.kapha)}`}>
                      {getEffectSymbol(food.effects.kapha)} {food.effects.kapha}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <Card className="shadow-soft border-border">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No food items found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}