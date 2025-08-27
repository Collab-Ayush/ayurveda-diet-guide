import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Apple, FileText, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Patients',
    value: '128',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Food Items',
    value: '247',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Apple,
  },
  {
    title: 'Active Diet Charts',
    value: '64',
    change: '+24%',
    changeType: 'positive' as const,
    icon: FileText,
  },
  {
    title: 'Success Rate',
    value: '92%',
    change: '+3%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
];

const recentPatients = [
  { name: 'Priya Sharma', prakriti: 'Vata-Pitta', lastVisit: '2 days ago' },
  { name: 'Rajesh Kumar', prakriti: 'Kapha', lastVisit: '1 week ago' },
  { name: 'Anita Desai', prakriti: 'Pitta', lastVisit: '3 days ago' },
  { name: 'Mohan Gupta', prakriti: 'Vata', lastVisit: '5 days ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your Ayurvedic practice.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-soft border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Patients</CardTitle>
            <CardDescription>
              Latest patient consultations and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Prakriti: {patient.prakriti}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {patient.lastVisit}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to get you started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button className="w-full p-4 text-left bg-muted rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium text-foreground">Add New Patient</div>
                <div className="text-sm text-muted-foreground">Create a new patient profile</div>
              </button>
              <button className="w-full p-4 text-left bg-muted rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium text-foreground">Create Diet Chart</div>
                <div className="text-sm text-muted-foreground">Generate a new diet plan</div>
              </button>
              <button className="w-full p-4 text-left bg-muted rounded-lg hover:bg-accent transition-colors">
                <div className="font-medium text-foreground">View Reports</div>
                <div className="text-sm text-muted-foreground">Analyze patient progress</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}