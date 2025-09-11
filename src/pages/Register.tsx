import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, User, UserCheck, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

export default function Register() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const { toast } = useToast()

  const handleNext = () => {
    if (step === 1 && !userType) {
      toast({
        title: "Please select account type",
        description: "Choose whether you're a patient or dietitian",
        variant: "destructive"
      })
      return
    }
    setStep(step + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both passwords match",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signUp(formData.email, formData.password)
      if (!error) {
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account",
        })
        navigate('/')
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again or contact support",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
          className="text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {step === 1 ? 'Back to Home' : 'Previous Step'}
        </Button>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Create Account
              </CardTitle>
            </div>
            <CardDescription>
              Step {step} of 2 - {step === 1 ? 'Choose Account Type' : 'Account Details'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">I am a:</Label>
                  <RadioGroup value={userType} onValueChange={setUserType} className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="patient" id="patient" />
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-green-600" />
                        <div>
                          <Label htmlFor="patient" className="font-medium cursor-pointer">
                            Patient
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Looking for personalized Ayurvedic nutrition guidance
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="dietitian" id="dietitian" />
                      <div className="flex items-center space-x-3">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                        <div>
                          <Label htmlFor="dietitian" className="font-medium cursor-pointer">
                            Dietitian/Practitioner
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Certified professional providing nutrition services
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button onClick={handleNext} className="w-full bg-green-600 hover:bg-green-700">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 h-11"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            )}
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}