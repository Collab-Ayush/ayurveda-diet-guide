import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, UserCheck, UserPlus, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { LeafAnimation } from '@/components/LeafAnimation'

export default function LandingPage() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    // If user is already authenticated, redirect them
    if (user && !loading) {
      navigate('/patient/dashboard')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    // Show content after animation
    const timer = setTimeout(() => {
      setShowAnimation(false)
      setTimeout(() => setShowContent(true), 300)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-green-300">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Leaf Animation */}
      {showAnimation && <LeafAnimation />}
      
      {/* Main Content */}
      <div className={`transition-all duration-700 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {showContent && (
          <div className="text-center space-y-8 max-w-md w-full">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Leaf className="w-8 h-8 text-white" />
                <h1 className="text-4xl font-bold text-white">AyurDiet</h1>
              </div>
              <div className="space-y-2">
                <p className="text-xl text-white/90 font-medium">
                  Your Personalized Ayurvedic Nutrition Companion
                </p>
                <p className="text-white/80">
                  Bridging Ancient Wisdom with Modern Nutrition Science
                </p>
              </div>
            </div>

            {/* Authentication Card */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/login/patient')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 h-auto"
                    size="lg"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Login as Patient
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/login/dietitian')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 h-auto"
                    size="lg"
                  >
                    <UserCheck className="w-5 h-5 mr-2" />
                    Login as Dietitian
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-muted-foreground/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/register')}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 h-auto"
                    size="lg"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create New Account
                  </Button>
                </div>
                
                <div className="pt-4 space-y-2 text-center">
                  <p className="text-xs text-muted-foreground">
                    Secure login powered by Supabase
                  </p>
                  <a 
                    href="mailto:support@ayurdiet.com" 
                    className="text-xs text-green-600 hover:text-green-700"
                  >
                    Need help? Contact support
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}