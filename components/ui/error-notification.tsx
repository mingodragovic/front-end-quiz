import { X } from 'lucide-react'
import { Button } from './button'

interface ErrorNotificationProps {
  message: string
  onClose: () => void
}

export function ErrorNotification({ message, onClose }: ErrorNotificationProps) {
  return (
    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-destructive flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-sm text-destructive-foreground font-medium">Error</p>
          </div>
          <p className="text-sm text-foreground mt-1">{message}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}