import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { DietChart } from '@/types/ayurveda'
import { useToast } from '@/hooks/use-toast'

export const useDietCharts = () => {
  const [dietCharts, setDietCharts] = useState<DietChart[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

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
      
      const formattedCharts = data?.map(chart => ({
        ...chart,
        patientId: chart.patient_id,
        dietitianId: chart.dietitian_id,
        startDate: new Date(chart.start_date),
        endDate: new Date(chart.end_date),
        createdAt: new Date(chart.created_at),
      })) || []
      
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
          start_date: chartData.startDate.toISOString(),
          end_date: chartData.endDate.toISOString(),
          meals: chartData.meals,
          notes: chartData.notes,
        }])
        .select()
        .single()

      if (error) throw error

      const newChart = {
        ...data,
        patientId: data.patient_id,
        dietitianId: data.dietitian_id,
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date),
        createdAt: new Date(data.created_at),
      }

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
      const { data, error } = await supabase
        .from('diet_charts')
        .update({
          patient_id: chartData.patientId,
          dietitian_id: chartData.dietitianId,
          title: chartData.title,
          start_date: chartData.startDate?.toISOString(),
          end_date: chartData.endDate?.toISOString(),
          meals: chartData.meals,
          notes: chartData.notes,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedChart = {
        ...data,
        patientId: data.patient_id,
        dietitianId: data.dietitian_id,
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date),
        createdAt: new Date(data.created_at),
      }

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