import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="text-6xl font-bold text-primary">404</div>
          <div className="text-lg text-muted-foreground mt-2">Page not found</div>
        </div>
        <p className="text-muted-foreground mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Back to Quiz</Link>
        </Button>
      </div>
    </div>
  )
}