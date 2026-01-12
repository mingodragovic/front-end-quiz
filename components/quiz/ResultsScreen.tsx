'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Share2, RotateCcw, TrendingUp } from 'lucide-react'
import { ParadoxLogo } from '@/components/branding/ParadoxLogo'
import { PersonalityIllustration, personalityColorMap } from '@/components/branding/PersonalityIllustrations'
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'
import { QuizResult } from '@/lib/types/quiz.types'
import { toast } from 'sonner'
import { useQuiz } from '@/hooks/useQuiz'

interface ResultsScreenProps {
  result: QuizResult
  onRetake: () => void
  onError: (error: string) => void
}

export function ResultsScreen({ result, onRetake, onError }: ResultsScreenProps) {
  const { resetQuiz } = useQuiz()
  
  const winnerName = result.finalPersonality?.name || 'Unknown'
  const winnerDescription = result.finalPersonality?.description || ''
  
  // Prepare chart data
  const barChartData = result.breakdown.scores.map(score => ({
    name: score.name.replace('The ', ''),
    percentage: score.score,
    fill: personalityColorMap[score.name] || '#8d2146'
  }))

  const radialChartData = result.breakdown.scores.map(score => ({
    name: score.name.replace('The ', ''),
    value: score.score,
    fill: personalityColorMap[score.name] || '#8d2146'
  }))

  const handleRetakeQuiz = () => {
    // Reset all quiz state
    resetQuiz()
    // Call parent callback to switch back to quiz view
    onRetake()
  }

  const handleShareResult = () => {
    if (result) {
      const shareText = `I'm a ${winnerName}! Take the Paradox Quiz to discover yours.`
      
      if (navigator.share) {
        navigator.share({
          title: 'Paradox Quiz Results',
          text: shareText
        }).catch(() => {
          // Fallback to copy
          navigator.clipboard.writeText(shareText)
          toast.success('Result copied to clipboard!')
        })
      } else {
        navigator.clipboard.writeText(shareText)
        toast.success('Result copied to clipboard!')
      }
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <ParadoxLogo size="md" className="mb-4" />
        </div>

        {/* Hero Section */}
        <Card className="p-8 mb-6 shadow-xl border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <PersonalityIllustration 
                type={winnerName}
                size={160}
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-3 bg-primary text-primary-foreground">
                Your Personality Type
              </Badge>
              <h1 className="text-4xl mb-3" style={{ color: personalityColorMap[winnerName] || '#8d2146' }}>
                {winnerName}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {winnerDescription}
              </p>
              
              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm">
                    <strong>{result.breakdown.scores.find(s => s.personalityId === result.finalPersonality?.id)?.score.toFixed(1)}%</strong> match
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Bar Chart */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <span>Score Breakdown</span>
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip 
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px' 
                  }}
                />
                <Bar dataKey="percentage" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Radial Chart */}
          <Card className="p-6">
            <h3 className="mb-4">Personality Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="20%" 
                outerRadius="100%" 
                data={radialChartData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background
                  dataKey="value"
                />
                <Legend 
                  iconSize={10} 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  formatter={(value) => <span className="text-sm">{value}</span>}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Logic Transparency Card */}
        <Card className="p-6 mb-6 border-2 border-muted">
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-1">
              Logic Badge
            </Badge>
            <div className="flex-1">
              <h4 className="mb-2">How We Calculated Your Result</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {result.breakdown.scores.map((score) => (
                    <div key={score.personalityId} className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-medium text-foreground">
                        {score.name.replace('The ', '')}
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        {score.rawPoints} pts
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                  <p className="text-primary-foreground">
                    <strong>Scoring Logic:</strong> Each answer contributes points to different personalities based on the question weight and option scores. The winner is determined by the highest total weighted score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleRetakeQuiz} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </Button>
          <Button onClick={handleShareResult} size="lg" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Result
          </Button>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Your results are based on your responses to {result.breakdown.scores.length} personality dimensions.
          Each answer contributes to your overall personality profile.
        </p>
      </div>
    </div>
  )
}