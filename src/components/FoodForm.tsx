import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FoodItem, Rasa, Guna, Virya, Vipaka } from "@/types/ayurveda"

interface FoodFormProps {
  food?: FoodItem
  onSubmit: (food: Omit<FoodItem, 'id'>) => void
  onCancel: () => void
}

const rasas: Rasa[] = ['Sweet', 'Sour', 'Salty', 'Pungent', 'Bitter', 'Astringent']
const gunas: Guna[] = ['Heavy', 'Light', 'Oily', 'Dry', 'Hot', 'Cold', 'Smooth', 'Rough']

export const FoodForm = ({ food, onSubmit, onCancel }: FoodFormProps) => {
  const [formData, setFormData] = useState({
    name: food?.name || '',
    category: food?.category || '',
    calories: food?.calories?.toString() || '',
    carbs: food?.carbs?.toString() || '',
    protein: food?.protein?.toString() || '',
    fat: food?.fat?.toString() || '',
    fiber: food?.fiber?.toString() || '',
    rasa: food?.rasa || [],
    guna: food?.guna || [],
    virya: food?.virya || '',
    vipaka: food?.vipaka || '',
    digestionDifficulty: food?.digestionDifficulty || '',
    vataEffect: food?.effects?.vata || '',
    pittaEffect: food?.effects?.pitta || '',
    kaphaEffect: food?.effects?.kapha || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      category: formData.category,
      calories: Number(formData.calories),
      carbs: Number(formData.carbs),
      protein: Number(formData.protein),
      fat: Number(formData.fat),
      fiber: Number(formData.fiber),
      rasa: formData.rasa,
      guna: formData.guna,
      virya: formData.virya as Virya,
      vipaka: formData.vipaka as Vipaka,
      digestionDifficulty: formData.digestionDifficulty as 'Easy' | 'Moderate' | 'Difficult',
      effects: {
        vata: formData.vataEffect as 'Increase' | 'Decrease' | 'Neutral',
        pitta: formData.pittaEffect as 'Increase' | 'Decrease' | 'Neutral',
        kapha: formData.kaphaEffect as 'Increase' | 'Decrease' | 'Neutral',
      }
    })
  }

  const handleRasaChange = (rasa: Rasa, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      rasa: checked 
        ? [...prev.rasa, rasa]
        : prev.rasa.filter(r => r !== rasa)
    }))
  }

  const handleGunaChange = (guna: Guna, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      guna: checked 
        ? [...prev.guna, guna]
        : prev.guna.filter(g => g !== guna)
    }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{food ? 'Edit Food Item' : 'Add New Food Item'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                placeholder="e.g., Grains, Vegetables, Fruits"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="calories">Calories (per 100g) *</Label>
              <Input
                id="calories"
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData(prev => ({...prev, calories: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="carbs">Carbs (g) *</Label>
              <Input
                id="carbs"
                type="number"
                step="0.1"
                value={formData.carbs}
                onChange={(e) => setFormData(prev => ({...prev, carbs: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="protein">Protein (g) *</Label>
              <Input
                id="protein"
                type="number"
                step="0.1"
                value={formData.protein}
                onChange={(e) => setFormData(prev => ({...prev, protein: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="fat">Fat (g) *</Label>
              <Input
                id="fat"
                type="number"
                step="0.1"
                value={formData.fat}
                onChange={(e) => setFormData(prev => ({...prev, fat: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="fiber">Fiber (g) *</Label>
              <Input
                id="fiber"
                type="number"
                step="0.1"
                value={formData.fiber}
                onChange={(e) => setFormData(prev => ({...prev, fiber: e.target.value}))}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Rasa (Taste) *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {rasas.map(rasa => (
                  <div key={rasa} className="flex items-center space-x-2">
                    <Checkbox
                      id={rasa}
                      checked={formData.rasa.includes(rasa)}
                      onCheckedChange={(checked) => handleRasaChange(rasa, checked as boolean)}
                    />
                    <Label htmlFor={rasa}>{rasa}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Guna (Qualities) *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {gunas.map(guna => (
                  <div key={guna} className="flex items-center space-x-2">
                    <Checkbox
                      id={guna}
                      checked={formData.guna.includes(guna)}
                      onCheckedChange={(checked) => handleGunaChange(guna, checked as boolean)}
                    />
                    <Label htmlFor={guna}>{guna}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="virya">Virya (Potency) *</Label>
              <Select value={formData.virya} onValueChange={(value) => setFormData(prev => ({...prev, virya: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select virya" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hot">Hot</SelectItem>
                  <SelectItem value="Cold">Cold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="vipaka">Vipaka (Post-digestive effect) *</Label>
              <Select value={formData.vipaka} onValueChange={(value) => setFormData(prev => ({...prev, vipaka: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vipaka" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sweet">Sweet</SelectItem>
                  <SelectItem value="Sour">Sour</SelectItem>
                  <SelectItem value="Pungent">Pungent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="digestionDifficulty">Digestion Difficulty *</Label>
              <Select value={formData.digestionDifficulty} onValueChange={(value) => setFormData(prev => ({...prev, digestionDifficulty: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Difficult">Difficult</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Dosha Effects *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <Label htmlFor="vataEffect">Vata Effect</Label>
                <Select value={formData.vataEffect} onValueChange={(value) => setFormData(prev => ({...prev, vataEffect: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select effect" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Increase">Increase</SelectItem>
                    <SelectItem value="Decrease">Decrease</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pittaEffect">Pitta Effect</Label>
                <Select value={formData.pittaEffect} onValueChange={(value) => setFormData(prev => ({...prev, pittaEffect: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select effect" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Increase">Increase</SelectItem>
                    <SelectItem value="Decrease">Decrease</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="kaphaEffect">Kapha Effect</Label>
                <Select value={formData.kaphaEffect} onValueChange={(value) => setFormData(prev => ({...prev, kaphaEffect: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select effect" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Increase">Increase</SelectItem>
                    <SelectItem value="Decrease">Decrease</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">{food ? 'Update' : 'Add'} Food Item</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}