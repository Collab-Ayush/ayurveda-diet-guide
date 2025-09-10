import { Clock, Calendar, TrendingUp, Target, MessageSquare, FileText, Utensils } from 'lucide-react'
import { StatCard } from '@/components/patient/StatCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePatient } from '@/contexts/PatientContext'
import { Link } from 'react-router-dom'

export default function PatientDashboard() {
  const { profile, appointments, messages } = usePatient()

  // Calculate days on program
  const startDate = new Date(profile?.currentPlan.startDate || '')
  const today = new Date()
  const daysOnProgram = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  // Get upcoming appointments
  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming').length

  // Get unread messages
  const unreadMessages = messages.filter(msg => msg.sender === 'dietitian' && msg.status !== 'read').length

  const quickActions = [
    {
      title: 'Log Today\'s Meals',
      description: 'Track your food intake',
      icon: Utensils,
      href: '/patient/diet-plan',
      color: 'bg-green-500'
    },
    {
      title: 'Message Dietitian',
      description: 'Get expert guidance',
      icon: MessageSquare,
      href: '/patient/messages',
      color: 'bg-blue-500'
    },
    {
      title: 'View Diet Chart',
      description: 'Check your meal plan',
      icon: FileText,
      href: '/patient/diet-plan',
      color: 'bg-purple-500'
    }
  ]

  const recentActivities = [
    {
      activity: 'Logged breakfast - Oats Porridge',
      time: '2 hours ago',
      type: 'meal'
    },
    {
      activity: 'Weight updated: 63.8 kg',
      time: '1 day ago',
      type: 'metric'
    },
    {
      activity: 'Message from Dr. Mehta',
      time: '2 days ago',
      type: 'message'
    },
    {
      activity: 'Completed daily wellness check',
      time: '3 days ago',
      type: 'wellness'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {profile?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's your health journey overview for today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Current Diet Plan"
          value={profile?.currentPlan.name || 'N/A'}
          description="Active program"
          icon={Target}
        />
        <StatCard
          title="Upcoming Appointments"
          value={upcomingAppointments}
          description="This month"
          icon={Calendar}
        />
        <StatCard
          title="Adherence Rate"
          value={`${profile?.healthMetrics.adherence}%`}
          description="Great progress!"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Days on Program"
          value={daysOnProgram}
          description="Keep going strong"
          icon={Clock}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to help you stay on track
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} to={action.href}>
                  <div className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                    <div className={`p-2 rounded-full ${action.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest interactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Current Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan Overview</CardTitle>
          <CardDescription>
            {profile?.currentPlan.name} - Started {new Date(profile?.currentPlan.startDate || '').toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Duration:</span>
                <Badge variant="outline">{profile?.currentPlan.duration}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Constitution:</span>
                <Badge variant="secondary">{profile?.prakriti}</Badge>
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link to="/patient/diet-plan">View Plan</Link>
              </Button>
              <Button asChild>
                <Link to="/patient/messages">Contact Dietitian</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}