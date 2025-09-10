import { Clock, Flame } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface MealItem {
  food: string
  quantity: string
  calories: number
  protein: number
  carbs: number
  fat: number
  doshaEffect: string
  prepTime: number
}

interface MealCardProps {
  mealType: string
  items: MealItem[]
  onViewRecipe?: (food: string) => void
}

export const MealCard = ({ mealType, items, onViewRecipe }: MealCardProps) => {
  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0)
  const totalPrepTime = Math.max(...items.map(item => item.prepTime))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="capitalize">{mealType}</span>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Flame className="h-4 w-4" />
            <span>{totalCalories} cal</span>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{totalPrepTime} min prep time</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{item.food}</h4>
              <Badge variant="secondary">{item.quantity}</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <span>P: {item.protein}g</span>
              <span>C: {item.carbs}g</span>
              <span>F: {item.fat}g</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {item.doshaEffect}
              </Badge>
              {onViewRecipe && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onViewRecipe(item.food)}
                  className="text-xs h-6"
                >
                  Recipe
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}