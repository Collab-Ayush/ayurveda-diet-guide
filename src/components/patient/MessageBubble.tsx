import { CheckCheck, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface MessageBubbleProps {
  content: string
  sender: 'patient' | 'dietitian'
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
}

export const MessageBubble = ({ content, sender, timestamp, status }: MessageBubbleProps) => {
  const isPatient = sender === 'patient'
  const time = new Date(timestamp).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })

  return (
    <div className={cn("flex gap-3 max-w-[80%]", isPatient ? "ml-auto" : "mr-auto")}>
      {!isPatient && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            DM
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("flex flex-col gap-1", isPatient && "items-end")}>
        <div className={cn(
          "rounded-lg px-3 py-2 max-w-xs break-words",
          isPatient 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}>
          <p className="text-sm">{content}</p>
        </div>
        
        <div className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground",
          isPatient && "flex-row-reverse"
        )}>
          <span>{time}</span>
          {isPatient && (
            <div className="flex items-center">
              {status === 'read' && <CheckCheck className="h-3 w-3 text-primary" />}
              {status === 'delivered' && <CheckCheck className="h-3 w-3" />}
              {status === 'sent' && <Check className="h-3 w-3" />}
            </div>
          )}
        </div>
      </div>
      
      {isPatient && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            PS
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}