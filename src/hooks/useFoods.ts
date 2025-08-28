import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { FoodItem, Rasa, Guna, Virya, Vipaka } from '@/types/ayurveda'
import { useToast } from '@/hooks/use-toast'
import type { Tables } from '@/integrations/supabase/types'

type DatabaseFood = Tables<'foods'>

export const useFoods = () => {
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const transformFood = (dbFood: DatabaseFood): FoodItem => ({
    id: dbFood.id,
    name: dbFood.name,
    category: dbFood.category,
    calories: dbFood.calories,
    carbs: dbFood.carbs,
    protein: dbFood.protein,
    fat: dbFood.fat,
    fiber: dbFood.fiber,
    rasa: (dbFood.rasa || []) as Rasa[],
    guna: (dbFood.guna || []) as Guna[],
    virya: dbFood.virya as Virya,
    vipaka: dbFood.vipaka as Vipaka,
    digestionDifficulty: dbFood.digestion_difficulty as 'Easy' | 'Moderate' | 'Difficult',
    effects: typeof dbFood.effects === 'object' && dbFood.effects !== null 
      ? dbFood.effects as { vata: 'Increase' | 'Decrease' | 'Neutral', pitta: 'Increase' | 'Decrease' | 'Neutral', kapha: 'Increase' | 'Decrease' | 'Neutral' }
      : { vata: 'Neutral', pitta: 'Neutral', kapha: 'Neutral' }
  })

  const fetchFoods = async () => {
    try {
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      
      const formattedFoods = data?.map(transformFood) || []
      setFoods(formattedFoods)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addFood = async (foodData: Omit<FoodItem, 'id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('foods')
        .insert([{
          name: foodData.name,
          category: foodData.category,
          calories: foodData.calories,
          carbs: foodData.carbs,
          protein: foodData.protein,
          fat: foodData.fat,
          fiber: foodData.fiber,
          rasa: foodData.rasa as string[],
          guna: foodData.guna as string[],
          virya: foodData.virya,
          vipaka: foodData.vipaka,
          digestion_difficulty: foodData.digestionDifficulty,
          effects: foodData.effects as any,
          user_id: user.id
        }])
        .select()
        .single()

      if (error) throw error

      const newFood = transformFood(data)
      setFoods(prev => [...prev, newFood])
      toast({
        title: "Success",
        description: "Food item added successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const updateFood = async (id: string, foodData: Partial<FoodItem>) => {
    try {
      const updateData: any = {}
      if (foodData.name !== undefined) updateData.name = foodData.name
      if (foodData.category !== undefined) updateData.category = foodData.category
      if (foodData.calories !== undefined) updateData.calories = foodData.calories
      if (foodData.carbs !== undefined) updateData.carbs = foodData.carbs
      if (foodData.protein !== undefined) updateData.protein = foodData.protein
      if (foodData.fat !== undefined) updateData.fat = foodData.fat
      if (foodData.fiber !== undefined) updateData.fiber = foodData.fiber
      if (foodData.rasa !== undefined) updateData.rasa = foodData.rasa as string[]
      if (foodData.guna !== undefined) updateData.guna = foodData.guna as string[]
      if (foodData.virya !== undefined) updateData.virya = foodData.virya
      if (foodData.vipaka !== undefined) updateData.vipaka = foodData.vipaka
      if (foodData.digestionDifficulty !== undefined) updateData.digestion_difficulty = foodData.digestionDifficulty
      if (foodData.effects !== undefined) updateData.effects = foodData.effects as any

      const { data, error } = await supabase
        .from('foods')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedFood = transformFood(data)
      setFoods(prev => prev.map(f => f.id === id ? updatedFood : f))
      toast({
        title: "Success",
        description: "Food item updated successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const deleteFood = async (id: string) => {
    try {
      const { error } = await supabase
        .from('foods')
        .delete()
        .eq('id', id)

      if (error) throw error

      setFoods(prev => prev.filter(f => f.id !== id))
      toast({
        title: "Success",
        description: "Food item deleted successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  return {
    foods,
    loading,
    addFood,
    updateFood,
    deleteFood,
    refetch: fetchFoods,
  }
}