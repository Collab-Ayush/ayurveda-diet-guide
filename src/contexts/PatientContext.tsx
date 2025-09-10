import { createContext, useContext, useState, useEffect } from 'react'

export interface PatientProfile {
  id: string
  name: string
  email: string
  phone: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  prakriti: string
  currentPlan: {
    name: string
    startDate: string
    duration: string
  }
  healthMetrics: {
    weight: Array<{ date: string; value: number }>
    energy: Array<{ date: string; value: number }>
    digestion: Array<{ date: string; value: number }>
    adherence: number
  }
}

export interface DietPlan {
  id: string
  name: string
  startDate: string
  duration: string
  meals: {
    [key: string]: Array<{
      food: string
      quantity: string
      calories: number
      protein: number
      carbs: number
      fat: number
      doshaEffect: string
      prepTime: number
    }>
  }
}

export interface Appointment {
  id: string
  date: string
  time: string
  type: 'consultation' | 'follow-up'
  status: 'upcoming' | 'completed' | 'cancelled'
  notes?: string
}

export interface Message {
  id: string
  sender: 'patient' | 'dietitian'
  content: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
}

interface PatientContextType {
  profile: PatientProfile | null
  dietPlan: DietPlan | null
  appointments: Appointment[]
  messages: Message[]
  addMessage: (content: string) => void
  updateHealthMetric: (type: string, value: number) => void
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

export const usePatient = () => {
  const context = useContext(PatientContext)
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider')
  }
  return context
}

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
  // Mock patient data
  const [profile] = useState<PatientProfile>({
    id: 'patient_123',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    age: 32,
    gender: 'Female',
    prakriti: 'Vata-Pitta',
    currentPlan: {
      name: 'Digestive Health Program',
      startDate: '2024-01-15',
      duration: '3 months'
    },
    healthMetrics: {
      weight: [
        { date: '2024-01-15', value: 65 },
        { date: '2024-01-22', value: 64.5 },
        { date: '2024-01-29', value: 64 },
        { date: '2024-02-05', value: 63.8 }
      ],
      energy: [
        { date: '2024-01-15', value: 6 },
        { date: '2024-01-22', value: 7 },
        { date: '2024-01-29', value: 8 },
        { date: '2024-02-05', value: 8 }
      ],
      digestion: [
        { date: '2024-01-15', value: 5 },
        { date: '2024-01-22', value: 7 },
        { date: '2024-01-29', value: 8 },
        { date: '2024-02-05', value: 9 }
      ],
      adherence: 85
    }
  })

  const [dietPlan] = useState<DietPlan>({
    id: 'plan_123',
    name: 'Digestive Health Program',
    startDate: '2024-01-15',
    duration: '3 months',
    meals: {
      breakfast: [
        {
          food: 'Oats Porridge with Almonds',
          quantity: '1 cup',
          calories: 150,
          protein: 6,
          carbs: 27,
          fat: 3,
          doshaEffect: 'Balances Vata',
          prepTime: 10
        },
        {
          food: 'Herbal Tea (Ginger-Tulsi)',
          quantity: '1 cup',
          calories: 5,
          protein: 0,
          carbs: 1,
          fat: 0,
          doshaEffect: 'Reduces Kapha',
          prepTime: 5
        }
      ],
      lunch: [
        {
          food: 'Quinoa Khichdi',
          quantity: '1 bowl',
          calories: 220,
          protein: 8,
          carbs: 40,
          fat: 4,
          doshaEffect: 'Tridoshic (balances all)',
          prepTime: 25
        },
        {
          food: 'Cucumber Raita',
          quantity: '1/2 cup',
          calories: 60,
          protein: 3,
          carbs: 8,
          fat: 2,
          doshaEffect: 'Cools Pitta',
          prepTime: 5
        }
      ],
      dinner: [
        {
          food: 'Moong Dal Soup',
          quantity: '1 bowl',
          calories: 180,
          protein: 12,
          carbs: 30,
          fat: 1,
          doshaEffect: 'Easy to digest',
          prepTime: 20
        },
        {
          food: 'Steamed Vegetables',
          quantity: '1 cup',
          calories: 80,
          protein: 3,
          carbs: 18,
          fat: 1,
          doshaEffect: 'Grounding for Vata',
          prepTime: 15
        }
      ]
    }
  })

  const [appointments] = useState<Appointment[]>([
    {
      id: 'apt_1',
      date: '2024-02-10',
      time: '10:00 AM',
      type: 'consultation',
      status: 'upcoming'
    },
    {
      id: 'apt_2',
      date: '2024-01-27',
      time: '2:00 PM',
      type: 'follow-up',
      status: 'completed',
      notes: 'Great progress with digestion. Continue current plan.'
    }
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      sender: 'dietitian',
      content: 'Hello Priya! How are you feeling on the new diet plan?',
      timestamp: '2024-02-01T10:00:00Z',
      status: 'read'
    },
    {
      id: 'msg_2',
      sender: 'patient',
      content: 'Hi Dr. Mehta! I\'m feeling much better. My digestion has improved significantly.',
      timestamp: '2024-02-01T14:30:00Z',
      status: 'read'
    },
    {
      id: 'msg_3',
      sender: 'dietitian',
      content: 'That\'s wonderful to hear! Keep following the meal plan and stay hydrated.',
      timestamp: '2024-02-02T09:15:00Z',
      status: 'read'
    }
  ])

  const addMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: 'patient',
      content,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }
    setMessages(prev => [...prev, newMessage])
  }

  const updateHealthMetric = (type: string, value: number) => {
    // This would normally update the database
    console.log(`Updating ${type} to ${value}`)
  }

  const value = {
    profile,
    dietPlan,
    appointments,
    messages,
    addMessage,
    updateHealthMetric
  }

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
}