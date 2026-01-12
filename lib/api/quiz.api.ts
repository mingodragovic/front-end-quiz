import api from './axios'
import { Question, Personality, QuizAnswer, QuizResult, QuizAttempt } from '../types/quiz.types'

export const quizApi = {
  // Get all questions with options
  getQuestions: async (): Promise<{ success: boolean; data: Question[]; timestamp: string }> => {
    const response = await api.get('/questions')
    return response.data
  },

  // Get all personality types
  getPersonalities: async (): Promise<{ success: boolean; data: Personality[]; timestamp: string }> => {
    const response = await api.get('/questions/personalities')
    return response.data
  },

  // Get complete quiz configuration
  getQuizConfig: async (): Promise<{ 
    success: boolean; 
    data: { 
      questions: Question[]; 
      personalities: Personality[] 
    }; 
    timestamp: string 
  }> => {
    const response = await api.get('/quiz')
    return response.data
  },

  // Submit quiz answers
  submitQuiz: async (answers: QuizAnswer[]): Promise<{ 
    success: boolean; 
    data: QuizResult; 
    timestamp: string 
  }> => {
    const response = await api.post('/quiz/submit', { answers })
    return response.data
  },

  // Get quiz attempt by ID
  getQuizAttempt: async (id: number): Promise<{ 
    success: boolean; 
    data: QuizAttempt; 
    timestamp: string 
  }> => {
    const response = await api.get(`/quiz/attempt/${id}`)
    return response.data
  },

  // Get paginated attempts
  getAttempts: async (page: number = 1, limit: number = 10): Promise<{ 
    success: boolean; 
    data: { 
      data: QuizAttempt[]; 
      meta: any 
    }; 
    timestamp: string 
  }> => {
    const response = await api.get(`/attempts?page=${page}&limit=${limit}`)
    return response.data
  },

  // Get attempts count
  getAttemptsCount: async (): Promise<{ 
    success: boolean; 
    data: { count: number }; 
    timestamp: string 
  }> => {
    const response = await api.get('/attempts/count')
    return response.data
  },

  // Validate option for question
  validateOption: async (questionId: number, optionId: number): Promise<{ 
    success: boolean; 
    data: { isValid: boolean }; 
    timestamp: string 
  }> => {
    const response = await api.get(`/questions/validate/${questionId}/${optionId}`)
    return response.data
  }
}