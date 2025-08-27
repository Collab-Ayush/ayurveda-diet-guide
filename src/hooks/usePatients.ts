import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Patient } from '@/types/ayurveda'
import { useToast } from '@/hooks/use-toast'

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPatients(data || [])
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

  const addPatient = async (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([{
          ...patientData,
          medical_conditions: patientData.medicalConditions,
          bowel_movements: patientData.bowelMovements,
          water_intake: patientData.waterIntake,
        }])
        .select()
        .single()

      if (error) throw error

      const newPatient = {
        ...data,
        medicalConditions: data.medical_conditions,
        bowelMovements: data.bowel_movements,
        waterIntake: data.water_intake,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      }

      setPatients(prev => [newPatient, ...prev])
      toast({
        title: "Success",
        description: "Patient added successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const updatePatient = async (id: string, patientData: Partial<Patient>) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update({
          ...patientData,
          medical_conditions: patientData.medicalConditions,
          bowel_movements: patientData.bowelMovements,
          water_intake: patientData.waterIntake,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedPatient = {
        ...data,
        medicalConditions: data.medical_conditions,
        bowelMovements: data.bowel_movements,
        waterIntake: data.water_intake,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      }

      setPatients(prev => prev.map(p => p.id === id ? updatedPatient : p))
      toast({
        title: "Success",
        description: "Patient updated successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const deletePatient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPatients(prev => prev.filter(p => p.id !== id))
      toast({
        title: "Success",
        description: "Patient deleted successfully",
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
    fetchPatients()
  }, [])

  return {
    patients,
    loading,
    addPatient,
    updatePatient,
    deletePatient,
    refetch: fetchPatients,
  }
}