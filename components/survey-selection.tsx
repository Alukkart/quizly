"use client"

import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {surveys} from "@/lib/surveys"

export function SurveySelection() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-foreground mb-4">Мини-опросники</h1>
                    <p className="text-xl text-muted-foreground">Выберите интересующий вас опросник и узнайте больше о
                        себе</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {surveys.map((survey) => (
                        <Link key={survey.id} href={`/survey/${survey.id}`}>
                            <Card
                                className={`bg-gradient-to-r ${survey.color} h-full border-0 shadow-lg hover:shadow-xl duration-300 cursor-pointer hover:scale-105 transform transition-transform`}>
                                <CardHeader className={`text-white`}>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-2xl">{survey.title}</CardTitle>
                                            <CardDescription
                                                className="text-white/80 mt-2">{survey.description}</CardDescription>
                                        </div>
                                        <span className="text-4xl">{survey.icon}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                        Пройти опросник
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
