'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/sonner'
import { QuizScreen } from '@/components/quiz/QuizScreen'
import { ErrorNotification } from '@/components/ui/error-notification'
import { QuizResult } from '@/lib/types/quiz.types'
import { ResultsScreen } from '@/components/quiz/ResultsScreen'
import { RecentAttemptsScreen } from '@/components/quiz/RecentAttemptsScreen'

type Screen = 'quiz' | 'results' | 'attempts'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('quiz')
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleQuizSubmitSuccess = (result: QuizResult) => {
    setQuizResult(result)
    setCurrentScreen('results')
    setError(null)
  }

  const handleRetakeQuiz = () => {
    setQuizResult(null)
    setCurrentScreen('quiz')
  }

  const handleViewAttemptDetails = (attemptId: number) => {
    // This will be implemented when we fetch the attempt details
    console.log('View attempt details:', attemptId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Navigation Tabs */}
      <div className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={currentScreen} onValueChange={(value) => setCurrentScreen(value as Screen)}>
            <TabsList className="w-full justify-start h-14 bg-transparent border-0">
              <TabsTrigger value="quiz" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                Take Quiz
              </TabsTrigger>
              <TabsTrigger value="attempts" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                Recent Attempts
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-3xl mx-auto px-4 pt-4">
          <ErrorNotification message={error} onClose={() => setError(null)} />
        </div>
      )}

      {/* Main Content */}
      {currentScreen === 'quiz' && (
        <QuizScreen 
          onQuizSubmitSuccess={handleQuizSubmitSuccess}
          onError={setError}
        />
      )}

      {currentScreen === 'results' && quizResult && (
        <ResultsScreen 
          result={quizResult} 
          onRetake={handleRetakeQuiz}
          onError={setError}
        />
      )}

      {currentScreen === 'attempts' && (
        <RecentAttemptsScreen
          onViewDetails={handleViewAttemptDetails}
          onError={setError}
        />
      )}
    </div>
  )
}