import { useState } from 'react'
import { Calendar as CalendarIcon, ShoppingCart, BookOpen, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MealCard } from '@/components/patient/MealCard'
import { usePatient } from '@/contexts/PatientContext'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function PatientDietPlan() {
  const { profile, dietPlan } = usePatient()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showRecipe, setShowRecipe] = useState<string | null>(null)
  const [showShoppingList, setShowShoppingList] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const recipes: Record<string, string[]> = {
    'Oats Porridge with Almonds': [
      '1. Boil 1 cup water in a pot',
      '2. Add 1/2 cup rolled oats',
      '3. Cook for 5-7 minutes, stirring occasionally',
      '4. Add chopped almonds and a pinch of cinnamon',
      '5. Serve warm with a drizzle of honey'
    ],
    'Quinoa Khichdi': [
      '1. Wash and soak quinoa for 15 minutes',
      '2. Heat ghee in a pressure cooker',
      '3. Add cumin seeds, let them splutter',
      '4. Add ginger-garlic paste, sauté',
      '5. Add quinoa, moong dal, and vegetables',
      '6. Add water and pressure cook for 3 whistles',
      '7. Garnish with fresh coriander'
    ]
  }

  const generateShoppingList = () => {
    const items = Object.values(dietPlan?.meals || {}).flat()
    return items.map(item => item.food).filter((value, index, self) => self.indexOf(value) === index)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      toast({
        title: "Date Selected",
        description: `Viewing meal plan for ${format(date, 'PPP')}`,
      })
    }
  }

  const handleShoppingListDownload = () => {
    const items = generateShoppingList()
    const content = `Shopping List - ${format(new Date(), 'PPP')}\n\n${items.map((item, index) => `${index + 1}. ${item}`).join('\n')}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `shopping-list-${format(new Date(), 'yyyy-MM-dd')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Shopping List Downloaded",
      description: "Your shopping list has been saved to your downloads.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Diet Plan</h1>
          <p className="text-muted-foreground mt-2">
            {profile?.currentPlan.name} - Personalized for {profile?.prakriti} constitution
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={() => setShowShoppingList(true)}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Shopping List</span>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Plan Calendar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Overview</CardTitle>
          <CardDescription>
            Started {new Date(profile?.currentPlan.startDate || '').toLocaleDateString()} • 
            Duration: {profile?.currentPlan.duration}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="px-3 py-1">
              Constitution: {profile?.prakriti}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Active Plan
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Daily Meal Planner */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Meals</h2>
          <p className="text-sm text-muted-foreground">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(dietPlan?.meals || {}).map(([mealType, items]) => (
            <MealCard
              key={mealType}
              mealType={mealType}
              items={items}
              onViewRecipe={setShowRecipe}
            />
          ))}
        </div>
      </div>

      {/* Nutritional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Nutritional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">685</div>
              <div className="text-sm text-muted-foreground">Total Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">29g</div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">95g</div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">11g</div>
              <div className="text-sm text-muted-foreground">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipe Dialog */}
      <Dialog open={!!showRecipe} onOpenChange={() => setShowRecipe(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>{showRecipe}</span>
            </DialogTitle>
            <DialogDescription>
              Step-by-step cooking instructions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {showRecipe && recipes[showRecipe]?.map((step, index) => (
              <div key={index} className="flex space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Shopping List Dialog */}
      <Dialog open={showShoppingList} onOpenChange={setShowShoppingList}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Shopping List</span>
            </DialogTitle>
            <DialogDescription>
              Items needed for your current meal plan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto space-y-2">
              {generateShoppingList().map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleShoppingListDownload} className="flex-1">
                Download List
              </Button>
              <Button variant="outline" onClick={() => setShowShoppingList(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}