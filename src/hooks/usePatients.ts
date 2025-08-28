import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Patient, PrakritiType } from '@/types/ayurveda'
import { useToast } from '@/hooks/use-toast'
import type { Tables } from '@/integrations/supabase/types'

type DatabasePatient = Tables<'patients'>

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const transformPatient = (dbPatient: DatabasePatient): Patient => ({
    id: dbPatient.id,
    name: dbPatient.name,
    age: dbPatient.age,
    gender: dbPatient.gender as 'Male' | 'Female' | 'Other',
    height: dbPatient.height,
    weight: dbPatient.weight,
    prakriti: dbPatient.prakriti as PrakritiType,
    medicalConditions: dbPatient.medical_conditions || [],
    bowelMovements: dbPatient.bowel_movements as 'Regular' | 'Irregular' | 'Constipated',
    waterIntake: dbPatient.water_intake,
    lifestyle: dbPatient.lifestyle || '',
    createdAt: new Date(dbPatient.created_at || ''),
    updatedAt: new Date(dbPatient.updated_at || ''),
  })

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      const formattedPatients = data?.map(transformPatient) || []
      setPatients(formattedPatients)
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
          name: patientData.name,
          age: patientData.age,
          gender: patientData.gender,
          height: patientData.height,
          weight: patientData.weight,
          prakriti: patientData.prakriti,
          medical_conditions: patientData.medicalConditions,
          bowel_movements: patientData.bowelMovements,
          water_intake: patientData.waterIntake,
          lifestyle: patientData.lifestyle,
        }])
        .select()
        .single()

      if (error) throw error

      const newPatient = transformPatient(data)
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
      const updateData: any = {}
      if (patientData.name !== undefined) updateData.name = patientData.name
      if (patientData.age !== undefined) updateData.age = patientData.age
      if (patientData.gender !== undefined) updateData.gender = patientData.gender
      if (patientData.height !== undefined) updateData.height = patientData.height
      if (patientData.weight !== undefined) updateData.weight = patientData.weight
      if (patientData.prakriti !== undefined) updateData.prakriti = patientData.prakriti
      if (patientData.medicalConditions !== undefined) updateData.medical_conditions = patientData.medicalConditions
      if (patientData.bowelMovements !== undefined) updateData.bowel_movements = patientData.bowelMovements
      if (patientData.waterIntake !== undefined) updateData.water_intake = patientData.waterIntake
      if (patientData.lifestyle !== undefined) updateData.lifestyle = patientData.lifestyle
      updateData.updated_at = new Date().toISOString()

      const { data, error } = await supabase
        .from('patients')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedPatient = transformPatient(data)
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