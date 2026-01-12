import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Personality } from '@/lib/types/quiz.types'
import { quizApi } from '@/lib/api/quiz.api'

interface AttemptsStats {
  [personalityName: string]: number
}

export function useAttempts(page: number, limit: number) {
  const [stats, setStats] = useState<AttemptsStats>({})

  const {
    data: attemptsData,
    isLoading: attemptsLoading,
    error: attemptsError
  } = useQuery({
    queryKey: ['attempts', page, limit],
    queryFn: () => quizApi.getAttempts(page, limit),
    staleTime: 30000 // 30 seconds
  })

  const {
    data: personalitiesData,
    isLoading: personalitiesLoading,
    error: personalitiesError
  } = useQuery({
    queryKey: ['personalities'],
    queryFn: () => quizApi.getPersonalities(),
    staleTime: 5 * 60 * 1000 // 5 minutes
  })

  useEffect(() => {
    if (attemptsData?.data && personalitiesData?.data) {
      const newStats: AttemptsStats = {}
      personalitiesData.data.forEach((personality: Personality) => {
        newStats[personality.name] = 0
      })
      
      attemptsData.data.data.forEach((attempt: any) => {
        const personalityName = attempt.finalPersonality.name
        if (newStats[personalityName] !== undefined) {
          newStats[personalityName]++
        }
      })
      
      setStats(newStats)
    }
  }, [attemptsData, personalitiesData])

  return {
    attempts: attemptsData?.data?.data || [],
    meta: attemptsData?.data?.meta,
    personalities: personalitiesData?.data || [],
    stats,
    isLoading: attemptsLoading || personalitiesLoading,
    error: attemptsError || personalitiesError
  }
}