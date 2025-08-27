import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DietChart, Patient, FoodItem, Meal } from "@/types/ayurveda"
import { usePatients } from "@/hooks/usePatients"
import { useFoods } from "@/hooks/useFoods"
import { useAuth } from "@/contexts/AuthContext"

interface DietChartFormProps {
  dietChart?: DietChart
  onSubmit: (dietChart: Omit<DietChart, 'id' | 'createdAt'>) => void
  onCancel: () => void
}

export const DietChartForm = ({ dietChart, onSubmit, onCancel }: DietChartFormProps) => {
  const { user } = useAuth()
  const { patients } = usePatients()
  const { foods } = useFoods()
  
  const [formData, setFormData] = useState({
    patientId: dietChart?.patientId || '',
    title: dietChart?.title || '',
    startDate: dietChart?.startDate?.toISOString().split('T')[0] || '',
    endDate: dietChart?.endDate?.toISOString().split('T')[0] || '',
    notes: dietChart?.notes || '',
    meals: dietChart?.meals || [] as Meal[],
  })

  const [currentMeal, setCurrentMeal] = useState({
    type: 'Breakfast' as const,
    timing: '',
    instructions: '',
    selectedFoodId: '',
    quantity: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      patientId: formData.patientId,
      dietitianId: user?.id || '',
      title: formData.title,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      notes: formData.notes,
      meals: formData.meals,
    })
  }

  const addFoodToMeal = () => {
    if (!currentMeal.selectedFoodId || !currentMeal.quantity) return

    const food = foods.find(f => f.id === currentMeal.selectedFoodId)
    if (!food) return

    const newFoodPortion = {
      foodId: currentMeal.selectedFoodId,
      quantity: Number(currentMeal.quantity),
      food,
    }

    const existingMealIndex = formData.meals.findIndex(m => m.type === currentMeal.type)
    
    if (existingMealIndex >= 0) {
      const updatedMeals = [...formData.meals]
      updatedMeals[existingMealIndex] = {
        ...updatedMeals[existingMealIndex],
        foods: [...updatedMeals[existingMealIndex].foods, newFoodPortion],
        timing: currentMeal.timing || updatedMeals[existingMealIndex].timing,
        instructions: currentMeal.instructions || updatedMeals[existingMealIndex].instructions,
      }
      setFormData(prev => ({ ...prev, meals: updatedMeals }))
    } else {
      const newMeal: Meal = {
        id: Date.now().toString(),
        type: currentMeal.type,
        timing: currentMeal.timing,
        instructions: currentMeal.instructions,
        foods: [newFoodPortion],
      }
      setFormData(prev => ({ ...prev, meals: [...prev.meals, newMeal] }))
    }

    setCurrentMeal(prev => ({ ...prev, selectedFoodId: '', quantity: '' }))
  }

  const removeFoodFromMeal = (mealType: string, foodIndex: number) => {
    setFormData(prev => ({
      ...prev,
      meals: prev.meals.map(meal => 
        meal.type === mealType 
          ? { ...meal, foods: meal.foods.filter((_, index) => index !== foodIndex) }
          : meal
      ).filter(meal => meal.foods.length > 0)
    }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{dietChart ? 'Edit Diet Chart' : 'Create New Diet Chart'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientId">Patient *</Label>
              <Select value={formData.patientId} onValueChange={(value) => setFormData(prev => ({...prev, patientId: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} - {patient.prakriti}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                placeholder="e.g., 7-Day Detox Plan"
                required
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({...prev, startDate: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({...prev, endDate: e.target.value}))}
                required
              />
            </div>
          </div>

          <div>
            <Label>Add Meals</Label>
            <div className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="mealType">Meal Type</Label>
                  <Select value={currentMeal.type} onValueChange={(value: any) => setCurrentMeal(prev => ({...prev, type: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timing">Timing</Label>
                  <Input
                    id="timing"
                    value={currentMeal.timing}
                    onChange={(e) => setCurrentMeal(prev => ({...prev, timing: e.target.value}))}
                    placeholder="e.g., 8:00 AM"
                  />
                </div>
                <div>
                  <Label htmlFor="food">Food Item</Label>
                  <Select value={currentMeal.selectedFoodId} onValueChange={(value) => setCurrentMeal(prev => ({...prev, selectedFoodId: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select food" />
                    </SelectTrigger>
                    <SelectContent>
                      {foods.map(food => (
                        <SelectItem key={food.id} value={food.id}>
                          {food.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity (g)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={currentMeal.quantity}
                    onChange={(e) => setCurrentMeal(prev => ({...prev, quantity: e.target.value}))}
                    placeholder="100"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Input
                  id="instructions"
                  value={currentMeal.instructions}
                  onChange={(e) => setCurrentMeal(prev => ({...prev, instructions: e.target.value}))}
                  placeholder="e.g., Steam with minimal spices"
                />
              </div>
              <Button type="button" onClick={addFoodToMeal} variant="outline">
                Add Food to Meal
              </Button>
            </div>
          </div>

          {formData.meals.length > 0 && (
            <div>
              <Label>Current Meals</Label>
              <div className="space-y-4 mt-2">
                {formData.meals.map((meal, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{meal.type} - {meal.timing}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{meal.instructions}</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.foods.map((foodPortion, foodIndex) => (
                        <Badge key={foodIndex} variant="secondary" className="flex items-center gap-1">
                          {foodPortion.food?.name} ({foodPortion.quantity}g)
                          <button
                            type="button"
                            onClick={() => removeFoodFromMeal(meal.type, foodIndex)}
                            className="ml-1 text-xs hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
              placeholder="Special instructions, contraindications, or additional notes..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">{dietChart ? 'Update' : 'Create'} Diet Chart</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}