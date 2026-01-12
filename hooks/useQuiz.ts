import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  fetchQuestions, 
  submitQuiz as submitQuizAction,
  setCurrentQuestionIndex,
  setAnswer,
  clearAnswers,
  clearError
} from '@/lib/store/quizSlice'
import { QuizAnswer } from '@/lib/types/quiz.types'
import { AppDispatch,RootState } from '@/lib/store/store'

export function useQuiz() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    questions,
    personalities,
    isLoading,
    error: questionsError,
    currentQuestionIndex,
    answers,
    isSubmitting,
    submissionError,
    quizResult
  } = useSelector((state: RootState) => state.quiz)

  const [localError, setLocalError] = useState<string | null>(null)

  // Fetch questions on mount
  useEffect(() => {
    console.log('useQuiz - Questions length:', questions.length)
    if (questions.length === 0 && !isLoading) {
      console.log('useQuiz - Dispatching fetchQuestions')
      dispatch(fetchQuestions())
    }
  }, [dispatch, questions.length, isLoading])

  const handleSetCurrentQuestionIndex = useCallback((index: number) => {
    dispatch(setCurrentQuestionIndex(index))
  }, [dispatch])

  const handleSetAnswer = useCallback((questionId: number, optionId: number) => {
    console.log('Setting answer:', { questionId, optionId })
    dispatch(setAnswer({ questionId, optionId }))
  }, [dispatch])

  const handleClearAnswers = useCallback(() => {
    dispatch(clearAnswers())
  }, [dispatch])

  const handleSubmitQuiz = useCallback(async (): Promise<any> => {
    try {
      console.log('Submitting quiz with answers:', answers)
      
      if (answers.length !== questions.length) {
        const error = `Please answer all questions before submitting (${answers.length}/${questions.length})`
        setLocalError(error)
        throw new Error(error)
      }

      const result = await dispatch(submitQuizAction(answers)).unwrap()
      console.log('Quiz submitted successfully:', result)
      return result
    } catch (error) {
      console.error('Quiz submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit quiz'
      setLocalError(errorMessage)
      throw error
    }
  }, [dispatch, answers, questions.length])

  const handleClearErrors = useCallback(() => {
    setLocalError(null)
    dispatch(clearError())
  }, [dispatch])

  return {
    questions,
    personalities,
    isLoading,
    error: localError || questionsError || submissionError,
    currentQuestionIndex,
    setCurrentQuestionIndex: handleSetCurrentQuestionIndex,
    answers,
    setAnswer: handleSetAnswer,
    clearAnswers: handleClearAnswers,
    submitQuiz: handleSubmitQuiz,
    isSubmitting,
    quizResult,
    clearErrors: handleClearErrors
  }
}