'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react'
import { ParadoxLogo } from '@/components/branding/ParadoxLogo'
import { PersonalityIllustration, personalityColorMap } from '@/components/branding/PersonalityIllustrations'
import { useAttempts } from '@/hooks/useAttempts'

interface RecentAttemptsScreenProps {
  onViewDetails: (attemptId: number) => void
  onError: (error: string) => void
}

export function RecentAttemptsScreen({ onViewDetails, onError }: RecentAttemptsScreenProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { attempts, meta, isLoading, error, personalities, stats } = useAttempts(currentPage, 10)

  useEffect(() => {
    if (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      onError(errorMessage)
    }
  }, [error, onError])

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <ParadoxLogo size="md" className="mb-8" />
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading recent attempts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <ParadoxLogo size="md" className="mb-4" />
          <h1 className="text-3xl mb-2">Recent Paradoxes</h1>
          <p className="text-muted-foreground">
            Explore recent quiz completions and personality discoveries
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {personalities?.map((personality) => {
              const count = stats[personality.name] || 0
              return (
                <Card key={personality.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <PersonalityIllustration type={personality.name} size={48} />
                    <div>
                      <div className="text-2xl font-semibold">{count}</div>
                      <div className="text-sm text-muted-foreground">
                        {personality.name.split(' ')[1]}s
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Attempts Table */}
        {attempts && attempts.length > 0 ? (
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Type</TableHead>
                    <TableHead>Personality Result</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attempts.map((attempt) => {
                    const personality = attempt.finalPersonality
                    const topScore = Math.max(...Object.values(attempt.scoreSnapshot))
                    return (
                      <TableRow key={attempt.id}>
                        <TableCell>
                          <PersonalityIllustration 
                            type={personality.name} 
                            size={40}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{personality.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {personality.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            style={{ 
                              borderColor: personalityColorMap[personality.name],
                              color: personalityColorMap[personality.name]
                            }}
                          >
                            {topScore.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {formatDate(attempt.createdAt)}
                          </div>
                        </TableCell>
                   
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {meta && meta.pages > 1 && (
              <div className="p-4 border-t flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {meta.pages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === meta.pages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ) : (
          // Empty State
          <Card className="p-12">
            <div className="text-center max-w-md mx-auto">
              <div className="mb-4 flex justify-center">
                <PersonalityIllustration type="The Adventurer" size={120} />
              </div>
              <h3 className="mb-2">No Attempts Yet</h3>
              <p className="text-muted-foreground mb-6">
                There are no quiz attempts to display. Be the first to discover your paradox personality!
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}