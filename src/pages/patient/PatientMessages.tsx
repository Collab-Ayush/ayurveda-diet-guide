import { useState } from 'react'
import { Send, Paperclip, MoreVertical } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageBubble } from '@/components/patient/MessageBubble'
import { usePatient } from '@/contexts/PatientContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function PatientMessages() {
  const { messages, addMessage } = usePatient()
  const [newMessage, setNewMessage] = useState('')

  const quickTemplates = [
    "Need recipe substitution",
    "Experiencing side effects",
    "Questions about meal timing",
    "Request for consultation"
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage(newMessage.trim())
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-2">
            Chat with your assigned dietitian
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Dietitian Profile</DropdownMenuItem>
            <DropdownMenuItem>Schedule Consultation</DropdownMenuItem>
            <DropdownMenuItem>Message History</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dietitian Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">DM</span>
              </div>
              <div>
                <h3 className="font-medium">Dr. Rajesh Mehta</h3>
                <p className="text-sm text-muted-foreground">Ayurvedic Nutritionist</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Online
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Chat */}
        <Card className="lg:col-span-3">
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  sender={message.sender}
                  timestamp={message.timestamp}
                  status={message.status}
                />
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickTemplates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start h-auto p-2 text-xs"
                onClick={() => setNewMessage(template)}
              >
                {template}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}