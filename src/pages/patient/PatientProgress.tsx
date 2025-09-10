import { useState } from 'react'
import { Camera, Plus, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { ProgressChart } from '@/components/patient/ProgressChart'
import { usePatient } from '@/contexts/PatientContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function PatientProgress() {
  const { profile, updateHealthMetric } = usePatient()
  const [weight, setWeight] = useState('')
  const [energy, setEnergy] = useState([7])
  const [digestion, setDigestion] = useState([7])
  const [notes, setNotes] = useState('')

  const handleLogEntry = () => {
    if (weight) updateHealthMetric('weight', parseFloat(weight))
    updateHealthMetric('energy', energy[0])
    updateHealthMetric('digestion', digestion[0])
    
    // Reset form
    setWeight('')
    setEnergy([7])
    setDigestion([7])
    setNotes('')
  }

  const currentWeight = profile?.healthMetrics.weight[profile.healthMetrics.weight.length - 1]?.value || 0
  const weightChange = profile?.healthMetrics.weight.length > 1 
    ? currentWeight - profile.healthMetrics.weight[0].value 
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Tracker</h1>
          <p className="text-muted-foreground mt-2">
            Monitor your health journey and improvements
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Log Entry</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Daily Health Log</DialogTitle>
              <DialogDescription>
                Record your daily health metrics and observations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                />
              </div>
              
              <div>
                <Label>Energy Level: {energy[0]}/10</Label>
                <Slider
                  value={energy}
                  onValueChange={setEnergy}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Digestive Health: {digestion[0]}/10</Label>
                <Slider
                  value={digestion}
                  onValueChange={setDigestion}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any observations or notes about your day..."
                  rows={3}
                />
              </div>
              
              <Button onClick={handleLogEntry} className="w-full">
                Save Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWeight} kg</div>
            <p className="text-xs text-muted-foreground">
              {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg from start
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adherence Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.healthMetrics.adherence}%</div>
            <Progress value={profile?.healthMetrics.adherence} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Energy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(profile?.healthMetrics.energy.reduce((sum, e) => sum + e.value, 0) / profile?.healthMetrics.energy.length || 0).toFixed(1)}/10
            </div>
            <p className="text-xs text-muted-foreground">
              Last 4 weeks average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressChart
          title="Weight Tracking"
          description="Your weight progression over time"
          data={profile?.healthMetrics.weight || []}
          color="#22c55e"
          unit=" kg"
        />
        
        <ProgressChart
          title="Energy Levels"
          description="Daily energy rating (1-10 scale)"
          data={profile?.healthMetrics.energy || []}
          color="#3b82f6"
          unit="/10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressChart
          title="Digestive Health"
          description="How well your digestion is functioning"
          data={profile?.healthMetrics.digestion || []}
          color="#f59e0b"
          unit="/10"
        />
        
        {/* Photo Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Photo Progress</CardTitle>
            <CardDescription>
              Visual comparison of your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Before</Label>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Current</Label>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Upload New Photo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}