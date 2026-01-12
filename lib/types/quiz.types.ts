export interface Personality {
  id: number
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export interface OptionScore {
  id: number
  points: number
  optionId: number
  personalityId: number
  personality?: Personality
  createdAt?: string
  updatedAt?: string
}

export interface Option {
  id: number
  text: string
  questionId: number
  optionScores?: OptionScore[]
  createdAt?: string
  updatedAt?: string
}

export interface Question {
  id: number
  text: string
  weight: number
  order: number
  options: Option[]
  createdAt?: string
  updatedAt?: string
}

export interface QuizAnswer {
  questionId: number
  optionId: number
}

export interface ScoreBreakdownItem {
  personalityId: number
  name: string
  score: number
  rawPoints: number
}

export interface ScoreBreakdown {
  scores: ScoreBreakdownItem[]
  winnerPersonalityId: number
  winnerName: string
  winnerDescription: string
}

export interface QuizResult {
  quizAttemptId: number
  finalPersonality: Personality
  scoreSnapshot: Record<string, number>
  breakdown: ScoreBreakdown
  createdAt: string
}

export interface Answer {
  id: number
  quizAttemptId: number
  questionId: number
  optionId: number
  option: Option
  question: Question
  createdAt: string
  updatedAt: string
}

export interface QuizAttempt {
  id: number
  createdAt: string
  finalPersonalityId: number
  scoreSnapshot: Record<string, number>
  updatedAt: string
  finalPersonality: Personality
  answers: Answer[]
}

export interface QuizState {
  questions: Question[]
  personalities: Personality[]
  isLoading: boolean
  error: string | null
  currentQuestionIndex: number
  answers: QuizAnswer[]
  isSubmitting: boolean
  submissionError: string | null
  quizResult: QuizResult | null
}