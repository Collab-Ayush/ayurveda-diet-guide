import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Patient, PrakritiType } from '@/types/ayurveda';

// Mock data - in real app, this would come from API/database
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    height: 165,
    weight: 58,
    prakriti: 'Vata-Pitta',
    medicalConditions: ['Anxiety', 'Digestive Issues'],
    bowelMovements: 'Irregular',
    waterIntake: 2.5,
    lifestyle: 'Sedentary office work',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    height: 175,
    weight: 78,
    prakriti: 'Kapha',
    medicalConditions: ['Diabetes', 'High Cholesterol'],
    bowelMovements: 'Regular',
    waterIntake: 3.0,
    lifestyle: 'Moderate exercise',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Anita Desai',
    age: 28,
    gender: 'Female',
    height: 160,
    weight: 52,
    prakriti: 'Pitta',
    medicalConditions: ['Acidity', 'Stress'],
    bowelMovements: 'Regular',
    waterIntake: 2.8,
    lifestyle: 'Active lifestyle',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-20'),
  },
];

const prakritivariants: Record<PrakritiType, string> = {
  'Vata': 'bg-vata/10 text-vata border-vata/20',
  'Pitta': 'bg-pitta/10 text-pitta border-pitta/20',
  'Kapha': 'bg-kapha/10 text-kapha border-kapha/20',
  'Vata-Pitta': 'bg-gradient-to-r from-vata/10 to-pitta/10 text-foreground border-border',
  'Pitta-Kapha': 'bg-gradient-to-r from-pitta/10 to-kapha/10 text-foreground border-border',
  'Vata-Kapha': 'bg-gradient-to-r from-vata/10 to-kapha/10 text-foreground border-border',
  'Tridoshic': 'bg-gradient-to-r from-vata/10 via-pitta/10 to-kapha/10 text-foreground border-border',
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.prakriti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBMI = (weight: number, height: number) => {
    const bmi = weight / ((height / 100) ** 2);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-destructive' };
    if (bmi < 25) return { category: 'Normal', color: 'text-primary' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-pitta' };
    return { category: 'Obese', color: 'text-destructive' };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground">
            Manage patient profiles and track their Ayurvedic constitution
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search */}
      <Card className="shadow-soft border-border">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search patients by name or prakriti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => {
          const bmi = parseFloat(getBMI(patient.weight, patient.height));
          const bmiInfo = getBMICategory(bmi);

          return (
            <Card key={patient.id} className="shadow-soft border-border hover:shadow-card transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">{patient.name}</CardTitle>
                    <CardDescription>
                      {patient.age} years • {patient.gender}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Prakriti */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Prakriti</p>
                  <Badge className={prakritivariants[patient.prakriti]}>
                    {patient.prakriti}
                  </Badge>
                </div>

                {/* Physical Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Height</p>
                    <p className="font-medium text-foreground">{patient.height} cm</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Weight</p>
                    <p className="font-medium text-foreground">{patient.weight} kg</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">BMI</p>
                    <p className={`font-medium ${bmiInfo.color}`}>
                      {getBMI(patient.weight, patient.height)} ({bmiInfo.category})
                    </p>
                  </div>
                </div>

                {/* Health Info */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Medical Conditions</p>
                  <div className="flex flex-wrap gap-1">
                    {patient.medicalConditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Lifestyle */}
                <div className="text-sm">
                  <p className="text-muted-foreground">Water Intake</p>
                  <p className="font-medium text-foreground">{patient.waterIntake}L/day</p>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">Bowel Movements</p>
                  <p className="font-medium text-foreground">{patient.bowelMovements}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="shadow-soft border-border">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}