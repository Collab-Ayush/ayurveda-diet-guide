import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { FoodItem } from '@/types/ayurveda'
import { useToast } from '@/hooks/use-toast'

export const useFoods = () => {
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchFoods = async () => {
    try {
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      
      const formattedFoods = data?.map(food => ({
        ...food,
        digestionDifficulty: food.digestion_difficulty,
      })) || []
      
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
      const { data, error } = await supabase
        .from('foods')
        .insert([{
          ...foodData,
          digestion_difficulty: foodData.digestionDifficulty,
        }])
        .select()
        .single()

      if (error) throw error

      const newFood = {
        ...data,
        digestionDifficulty: data.digestion_difficulty,
      }

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
      const { data, error } = await supabase
        .from('foods')
        .update({
          ...foodData,
          digestion_difficulty: foodData.digestionDifficulty,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedFood = {
        ...data,
        digestionDifficulty: data.digestion_difficulty,
      }

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