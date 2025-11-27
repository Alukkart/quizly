"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuestionOption {
  text: string
  value: number
}

interface QuestionCardProps {
  question: {
    id: number
    question: string
    options: QuestionOption[]
  }
  questionNumber: number
  totalQuestions: number
  onAnswer: (value: number) => void
}

export function QuestionCard({ question, questionNumber, totalQuestions, onAnswer }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSelect = (value: number) => {
    setSelectedOption(value)
    setIsAnimating(true)
    setTimeout(() => {
      onAnswer(value)
      setSelectedOption(null)
      setIsAnimating(false)
    }, 300)
  }

  const progress = ((questionNumber - 1) / totalQuestions) * 100

  return (
    <Card className="w-full border-0 shadow-lg pt-0">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium opacity-90 mt-2">
              Вопрос {questionNumber} из {totalQuestions}
            </span>
            <span className="text-sm font-medium opacity-90">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-primary-foreground/20 rounded-full h-2">
            <div
              className="bg-primary-foreground h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 pb-8">
        <CardTitle className="text-2xl mb-8 text-foreground">{question.question}</CardTitle>

        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left font-medium
                ${
                  selectedOption === option.value
                    ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
                    : "border-border bg-background hover:border-primary hover:bg-indigo-600 hover:text-white"
                }
                ${isAnimating && selectedOption === option.value ? "opacity-75" : ""}
              `}
            >
              {option.text}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-6 text-center">Выберите один из вариантов ответа</p>
      </CardContent>
    </Card>
  )
}
