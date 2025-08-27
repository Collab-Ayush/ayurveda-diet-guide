import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Download, Edit, Trash2 } from 'lucide-react';
import { DietChart } from '@/types/ayurveda';

// Mock diet charts
const mockDietCharts: DietChart[] = [
  {
    id: '1',
    patientId: '1',
    dietitianId: 'dr1',
    title: 'Vata-Pitta Balancing Diet',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    meals: [
      {
        id: 'm1',
        type: 'Breakfast',
        timing: '7:00 AM',
        instructions: 'Eat warm and avoid cold foods',
        foods: [
          { foodId: '1', quantity: 100 },
          { foodId: '3', quantity: 10 }
        ]
      },
      {
        id: 'm2',
        type: 'Lunch',
        timing: '12:00 PM',
        instructions: 'Main meal of the day',
        foods: [
          { foodId: '1', quantity: 150 },
          { foodId: '2', quantity: 5 }
        ]
      }
    ],
    notes: 'Focus on warm, cooked foods. Avoid raw vegetables and cold drinks.',
    createdAt: new Date('2024-02-25')
  },
  {
    id: '2',
    patientId: '2',
    dietitianId: 'dr1',
    title: 'Kapha Reducing Diet Plan',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-04-15'),
    meals: [
      {
        id: 'm3',
        type: 'Breakfast',
        timing: '8:00 AM',
        instructions: 'Light breakfast with warming spices',
        foods: [
          { foodId: '4', quantity: 5 },
          { foodId: '2', quantity: 3 }
        ]
      }
    ],
    notes: 'Reduce heavy, oily foods. Include more warming spices and light foods.',
    createdAt: new Date('2024-03-10')
  }
];

const getDietStatus = (startDate: Date, endDate: Date) => {
  const now = new Date();
  if (now < startDate) return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800 border-blue-200' };
  if (now > endDate) return { status: 'Completed', color: 'bg-gray-100 text-gray-800 border-gray-200' };
  return { status: 'Active', color: 'bg-green-100 text-green-800 border-green-200' };
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default function DietCharts() {
  const [dietCharts, setDietCharts] = useState<DietChart[]>(mockDietCharts);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Diet Charts</h1>
          <p className="text-muted-foreground">
            Create and manage personalized Ayurvedic diet plans
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Create Diet Chart
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Charts</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">94%</p>
              </div>
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diet Charts List */}
      <div className="space-y-4">
        {dietCharts.map((chart) => {
          const statusInfo = getDietStatus(chart.startDate, chart.endDate);
          
          return (
            <Card key={chart.id} className="shadow-soft border-border hover:shadow-card transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-foreground">{chart.title}</CardTitle>
                      <Badge className={statusInfo.color}>
                        {statusInfo.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(chart.startDate)} - {formatDate(chart.endDate)}
                      </span>
                      <span>Patient ID: {chart.patientId}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Meals Overview */}
                  <div>
                    <p className="font-medium text-foreground mb-3">Meal Plan Overview</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {chart.meals.map((meal) => (
                        <div key={meal.id} className="bg-muted rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-sm text-foreground">{meal.type}</p>
                            <span className="text-xs text-muted-foreground">{meal.timing}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {meal.foods.length} food item{meal.foods.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {chart.notes && (
                    <div>
                      <p className="font-medium text-foreground mb-2">Special Instructions</p>
                      <p className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
                        {chart.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm" className="border-border">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="border-border">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {dietCharts.length === 0 && (
        <Card className="shadow-soft border-border">
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No Diet Charts Yet</p>
            <p className="text-muted-foreground mb-4">
              Create your first personalized Ayurvedic diet chart for a patient.
            </p>
            <Button className="bg-gradient-primary shadow-soft">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Diet Chart
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}