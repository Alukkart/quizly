"use client"

import { useState, use } from "react"
import Link from "next/link"
import { QuestionCard } from "@/components/question-card"
import { ResultsPage } from "@/components/results-page"
import { surveys } from "@/lib/surveys"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function SurveyPage({ params }: PageProps) {
  const { id } = use(params)
  const survey = surveys.find((s) => s.id === id)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  if (!survey) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Опросник не найден</h1>
          <Link href="/">
            <Button>Вернуться к выбору</Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < survey.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRetake = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const handleBackHome = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const totalScore = answers.reduce((sum, answer) => sum + answer, 0)
  const maxScore = survey.questions.length * 5

  if (showResults) {
    return (
      <ResultsPage
        survey={survey}
        score={totalScore}
        maxScore={maxScore}
        onRetake={handleRetake}
        onBackHome={handleBackHome}
        answersCount={answers.length}
      />
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-6">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            ← Вернуться к выбору опросников
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-2xl">
        <QuestionCard
          question={survey.questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={survey.questions.length}
          onAnswer={handleAnswer}
        />
      </div>
    </main>
  )
}
