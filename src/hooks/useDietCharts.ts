import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { DietChart, Meal } from '@/types/ayurveda'
import { useToast } from '@/hooks/use-toast'
import type { Tables } from '@/integrations/supabase/types'

type DatabaseDietChart = Tables<'diet_charts'> & {
  patients?: { name: string }
}

export const useDietCharts = () => {
  const [dietCharts, setDietCharts] = useState<DietChart[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const transformDietChart = (dbChart: DatabaseDietChart): DietChart => ({
    id: dbChart.id,
    patientId: dbChart.patient_id || '',
    dietitianId: dbChart.dietitian_id || '',
    title: dbChart.title,
    startDate: new Date(dbChart.start_date),
    endDate: new Date(dbChart.end_date),
    meals: Array.isArray(dbChart.meals) ? dbChart.meals as unknown as Meal[] : [],
    notes: dbChart.notes || '',
    createdAt: new Date(dbChart.created_at || ''),
  })

  const fetchDietCharts = async () => {
    try {
      const { data, error } = await supabase
        .from('diet_charts')
        .select(`
          *,
          patients(name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      const formattedCharts = data?.map(transformDietChart) || []
      setDietCharts(formattedCharts)
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

  const addDietChart = async (chartData: Omit<DietChart, 'id' | 'createdAt'>) => {
    try {
      const { data, error } = await supabase
        .from('diet_charts')
        .insert([{
          patient_id: chartData.patientId,
          dietitian_id: chartData.dietitianId,
          title: chartData.title,
          start_date: chartData.startDate.toISOString().split('T')[0],
          end_date: chartData.endDate.toISOString().split('T')[0],
          meals: chartData.meals as any,
          notes: chartData.notes,
        }])
        .select()
        .single()

      if (error) throw error

      const newChart = transformDietChart(data)
      setDietCharts(prev => [newChart, ...prev])
      toast({
        title: "Success",
        description: "Diet chart created successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const updateDietChart = async (id: string, chartData: Partial<DietChart>) => {
    try {
      const updateData: any = {}
      if (chartData.patientId !== undefined) updateData.patient_id = chartData.patientId
      if (chartData.dietitianId !== undefined) updateData.dietitian_id = chartData.dietitianId
      if (chartData.title !== undefined) updateData.title = chartData.title
      if (chartData.startDate !== undefined) updateData.start_date = chartData.startDate.toISOString().split('T')[0]
      if (chartData.endDate !== undefined) updateData.end_date = chartData.endDate.toISOString().split('T')[0]
      if (chartData.meals !== undefined) updateData.meals = chartData.meals as any
      if (chartData.notes !== undefined) updateData.notes = chartData.notes

      const { data, error } = await supabase
        .from('diet_charts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedChart = transformDietChart(data)
      setDietCharts(prev => prev.map(c => c.id === id ? updatedChart : c))
      toast({
        title: "Success",
        description: "Diet chart updated successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const deleteDietChart = async (id: string) => {
    try {
      const { error } = await supabase
        .from('diet_charts')
        .delete()
        .eq('id', id)

      if (error) throw error

      setDietCharts(prev => prev.filter(c => c.id !== id))
      toast({
        title: "Success",
        description: "Diet chart deleted successfully",
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
    fetchDietCharts()
  }, [])

  return {
    dietCharts,
    loading,
    addDietChart,
    updateDietChart,
    deleteDietChart,
    refetch: fetchDietCharts,
  }
}