'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Check } from 'lucide-react'
import { ParadoxLogo } from '@/components/branding/ParadoxLogo'
import { useQuiz } from '@/hooks/useQuiz'
import { toast } from 'sonner'

interface QuizScreenProps {
  onQuizSubmitSuccess: (result: any) => void
  onError: (error: string) => void
}

export function QuizScreen({ onQuizSubmitSuccess, onError }: QuizScreenProps) {
  const {
    questions,
    isLoading,
    error,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswer,
    submitQuiz,
    isSubmitting
  } = useQuiz()

  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  useEffect(() => {
    if (error) {
      onError(error)
    }
  }, [error, onError])

  useEffect(() => {
    // Set selected option based on current answer
    const currentAnswer = answers.find(a => a.questionId === questions[currentQuestionIndex]?.id)
    setSelectedOption(currentAnswer?.optionId || null)
  }, [currentQuestionIndex, questions, answers])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <ParadoxLogo size="md" className="mb-8" />
          <p className="text-lg text-muted-foreground">Loading quiz questions...</p>
        </div>
      </div>
    )
  }

  if (error || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <ParadoxLogo size="md" className="mb-8" />
          <Card className="p-8">
         <p className="text-lg text-destructive">
              Failed to load quiz questions. Please try again later.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId)
  }

  const handleNext = async () => {
    if (selectedOption === null) {
      toast.error('Please select an option')
      return
    }

    // Save answer
    setAnswer(currentQuestion.id, selectedOption)

    if (isLastQuestion) {
      // Submit all answers
      try {
        const result = await submitQuiz()
        if (result) {
          onQuizSubmitSuccess(result)
        }
      } catch (err) {
        onError(err instanceof Error ? err.message : 'Failed to submit quiz')
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <ParadoxLogo size="md" className="mb-6" />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-6 shadow-lg border-2">
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wide text-primary font-medium">
                Question {currentQuestionIndex + 1}
              </span>
              <h2 className="mt-2 text-2xl">{currentQuestion.text}</h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={isSubmitting}
                    className={`
                      w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                      ${isSelected 
                        ? 'border-primary bg-primary text-primary-foreground shadow-md' 
                        : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
                      }
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className={isSelected ? 'font-medium' : ''}>{option.text}</span>
                      {isSelected && (
                        <div className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || isSubmitting}
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedOption === null || isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {isLastQuestion ? 'Submitting...' : 'Loading...'}
              </>
            ) : (
              isLastQuestion ? 'Submit Quiz' : 'Next'
            )}
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Select an option that best represents you, then click {isLastQuestion ? 'Submit' : 'Next'} to continue.
        </p>
      </div>
    </div>
  )
}