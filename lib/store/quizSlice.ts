import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { quizApi } from '../api/quiz.api'
import { QuizState, Question, QuizAnswer, QuizResult } from '../types/quiz.types'

const initialState: QuizState = {
  questions: [],
  personalities: [],
  isLoading: false,
  error: null,
  currentQuestionIndex: 0,
  answers: [],
  isSubmitting: false,
  submissionError: null,
  quizResult: null
}

// Async thunks
export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await quizApi.getQuizConfig()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch questions')
    }
  }
)

export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async (answers: QuizAnswer[], { rejectWithValue }) => {
    try {
      const response = await quizApi.submitQuiz(answers)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to submit quiz')
    }
  }
)

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload
    },
    setAnswer: (state, action: PayloadAction<QuizAnswer>) => {
      const { questionId, optionId } = action.payload
      const existingIndex = state.answers.findIndex(a => a.questionId === questionId)
      
      if (existingIndex >= 0) {
        state.answers[existingIndex] = { questionId, optionId }
      } else {
        state.answers.push({ questionId, optionId })
      }
    },
    clearAnswers: (state) => {
      state.answers = []
      state.currentQuestionIndex = 0
      state.quizResult = null
    },
    clearError: (state) => {
      state.error = null
      state.submissionError = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.questions = action.payload.questions
        state.personalities = action.payload.personalities
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Submit quiz
      .addCase(submitQuiz.pending, (state) => {
        state.isSubmitting = true
        state.submissionError = null
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.isSubmitting = false
        state.quizResult = action.payload
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.isSubmitting = false
        state.submissionError = action.payload as string
      })
  }
})

export const { 
  setCurrentQuestionIndex, 
  setAnswer, 
  clearAnswers,
  clearError 
} = quizSlice.actions

export default quizSlice.reducer