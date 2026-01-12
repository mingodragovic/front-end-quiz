'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Check } from 'lucide-react'
import { ParadoxLogo } from '@/components/branding/ParadoxLogo'
import { useQuiz } from '@/hooks/useQuiz'
import { toast } from 'sonner'
import { ParadoxLoader } from '../ui/paradox-loader'

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <ParadoxLogo className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading quiz questions...</p>
        </div>
      </div>
    )
  }

  if (error || !questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 max-w-md">
         <ParadoxLoader/>
        </Card>
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
      // FIXED: Build the complete answers array including the current answer
      const completeAnswers = [
        ...answers.filter(a => a.questionId !== currentQuestion.id),
        { questionId: currentQuestion.id, optionId: selectedOption }
      ]

      // Submit all answers
      try {
        console.log('Submitting with complete answers:', completeAnswers)
        const result = await submitQuiz(completeAnswers)
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <ParadoxLogo className="w-12 h-12 mx-auto" />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round(progress)}% Complete
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">
                Question {currentQuestionIndex + 1}
              </p>
              <h2 className="text-2xl font-bold">{currentQuestion.text}</h2>
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
                      <span className="font-medium">{option.text}</span>
                      {isSelected && (
                        <Check className="w-5 h-5 flex-shrink-0" />
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
                <span className="animate-spin mr-2">⏳</span>
                {isLastQuestion ? 'Submitting...' : 'Loading...'}
              </>
            ) : (
              isLastQuestion ? 'Submit Quiz' : 'Next'
            )}
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground">
          Select an option that best represents you, then click {isLastQuestion ? 'Submit' : 'Next'} to continue.
        </p>
      </div>
    </div>
  )
}