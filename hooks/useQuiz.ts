import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store/store'

import { Question, QuizAnswer } from '@/lib/types/quiz.types'
import {   fetchQuestions,
  setCurrentQuestionIndex,
  setAnswer,
  clearAnswers,
  submitQuiz as submitQuizAction } from '@/lib/store/quizSlice'

export function useQuiz() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    questions,
    isLoading: questionsLoading,
    error: questionsError,
    currentQuestionIndex,
    answers,
    isSubmitting,
    submissionError,
    quizResult
  } = useSelector((state: RootState) => state.quiz)

  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchQuestions())
    }
  }, [dispatch, questions.length])

  const handleSetCurrentQuestionIndex = useCallback((index: number) => {
    dispatch(setCurrentQuestionIndex(index))
  }, [dispatch])

  const handleSetAnswer = useCallback((questionId: number, optionId: number) => {
    dispatch(setAnswer({ questionId, optionId }))
  }, [dispatch])

  const handleClearAnswers = useCallback(() => {
    dispatch(clearAnswers())
  }, [dispatch])

  const handleSubmitQuiz = useCallback(async (): Promise<any> => {
    try {
      if (answers.length !== questions.length) {
        throw new Error('Please answer all questions before submitting')
      }

      const result = await dispatch(submitQuizAction(answers)).unwrap()
      return result
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : 'Failed to submit quiz')
      throw error
    }
  }, [dispatch, answers, questions.length])

  return {
    questions,
    isLoading: questionsLoading,
    error: localError || questionsError || submissionError,
    currentQuestionIndex,
    answers,
    setCurrentQuestionIndex: handleSetCurrentQuestionIndex,
    setAnswer: handleSetAnswer,
    clearAnswers: handleClearAnswers,
    submitQuiz: handleSubmitQuiz,
    isSubmitting,
    quizResult
  }
}