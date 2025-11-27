"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Survey } from "@/lib/surveys"

interface ResultsPageProps {
  survey: Survey
  score: number
  maxScore: number
  onRetake: () => void
  onBackHome: () => void
  answersCount: number
}

export function ResultsPage({ survey, score, maxScore, onRetake, onBackHome, answersCount }: ResultsPageProps) {
  const percentage = (score / maxScore) * 100

  const getStatus = () => {
    if (percentage >= 80) {
      return {
        title: "Отличный результат!",
        description: "Вы показали превосходный результат. Продолжайте так же!",
        color: "from-green-500 to-emerald-600",
      }
    } else if (percentage >= 60) {
      return {
        title: "Хороший результат",
        description: "Ваш результат выше среднего. Есть возможность для улучшения.",
        color: "from-blue-500 to-cyan-600",
      }
    } else if (percentage >= 40) {
      return {
        title: "Средний результат",
        description: "Рекомендуем обратить внимание на указанные области.",
        color: "from-yellow-500 to-orange-600",
      }
    } else {
      return {
        title: "Результат требует внимания",
        description: "Пора внести улучшения в данной области.",
        color: "from-red-500 to-orange-600",
      }
    }
  }

  const status = getStatus()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="p-0 w-full border-0 shadow-2xl overflow-hidden">
          <CardHeader className={`bg-gradient-to-r ${status.color} text-white p-8`}>
            <CardTitle className="text-4xl text-center">{status.title}</CardTitle>
          </CardHeader>

          <CardContent className="pt-10 pb-10">
            <div className="text-center mb-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-primary">{Math.round(percentage)}%</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {score} из {maxScore} баллов
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-foreground mb-8">{status.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10 p-6 bg-card rounded-lg border border-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{survey.icon}</p>
                <p className="text-sm text-muted-foreground mt-2">Опросник</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{answersCount}</p>
                <p className="text-sm text-muted-foreground">Вопросов</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{Math.round(percentage)}%</p>
                <p className="text-sm text-muted-foreground">Результат</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={onRetake}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-lg text-base"
              >
                Пройти снова
              </Button>
              <Link href="/" onClick={onBackHome} className="block">
                <Button variant="outline" className="w-full font-semibold py-6 rounded-lg text-base bg-transparent">
                  Выбрать другой опросник
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
