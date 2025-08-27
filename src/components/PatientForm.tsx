import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Patient, PrakritiType } from "@/types/ayurveda"

interface PatientFormProps {
  patient?: Patient
  onSubmit: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

export const PatientForm = ({ patient, onSubmit, onCancel }: PatientFormProps) => {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    age: patient?.age || '',
    gender: patient?.gender || '',
    height: patient?.height || '',
    weight: patient?.weight || '',
    prakriti: patient?.prakriti || '',
    bowelMovements: patient?.bowelMovements || '',
    waterIntake: patient?.waterIntake || '',
    lifestyle: patient?.lifestyle || '',
    medicalConditions: patient?.medicalConditions || [],
    newCondition: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      age: Number(formData.age),
      gender: formData.gender as 'Male' | 'Female' | 'Other',
      height: Number(formData.height),
      weight: Number(formData.weight),
      prakriti: formData.prakriti as PrakritiType,
      bowelMovements: formData.bowelMovements as 'Regular' | 'Irregular' | 'Constipated',
      waterIntake: Number(formData.waterIntake),
      lifestyle: formData.lifestyle,
      medicalConditions: formData.medicalConditions,
    })
  }

  const addCondition = () => {
    if (formData.newCondition.trim()) {
      setFormData(prev => ({
        ...prev,
        medicalConditions: [...prev.medicalConditions, prev.newCondition.trim()],
        newCondition: ''
      }))
    }
  }

  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter((_, i) => i !== index)
    }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{patient ? 'Edit Patient' : 'Add New Patient'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({...prev, age: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({...prev, gender: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="height">Height (cm) *</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({...prev, height: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg) *</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({...prev, weight: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="prakriti">Prakriti *</Label>
              <Select value={formData.prakriti} onValueChange={(value) => setFormData(prev => ({...prev, prakriti: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Prakriti" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vata">Vata</SelectItem>
                  <SelectItem value="Pitta">Pitta</SelectItem>
                  <SelectItem value="Kapha">Kapha</SelectItem>
                  <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                  <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                  <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
                  <SelectItem value="Tridoshic">Tridoshic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bowelMovements">Bowel Movements *</Label>
              <Select value={formData.bowelMovements} onValueChange={(value) => setFormData(prev => ({...prev, bowelMovements: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bowel movements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Irregular">Irregular</SelectItem>
                  <SelectItem value="Constipated">Constipated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="waterIntake">Water Intake (L/day) *</Label>
              <Input
                id="waterIntake"
                type="number"
                step="0.1"
                value={formData.waterIntake}
                onChange={(e) => setFormData(prev => ({...prev, waterIntake: e.target.value}))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="lifestyle">Lifestyle</Label>
            <Textarea
              id="lifestyle"
              value={formData.lifestyle}
              onChange={(e) => setFormData(prev => ({...prev, lifestyle: e.target.value}))}
              placeholder="Describe lifestyle, work schedule, exercise habits..."
            />
          </div>

          <div>
            <Label>Medical Conditions</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={formData.newCondition}
                onChange={(e) => setFormData(prev => ({...prev, newCondition: e.target.value}))}
                placeholder="Add medical condition"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCondition())}
              />
              <Button type="button" onClick={addCondition} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.medicalConditions.map((condition, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {condition}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeCondition(index)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">{patient ? 'Update' : 'Add'} Patient</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}