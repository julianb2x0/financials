"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizResults } from "@/components/quiz-results"
import { questions, reverseScoreItems, contextWeights } from "@/lib/quiz-data"
import { motion, AnimatePresence } from "framer-motion"
import { HolographicProgress } from "@/components/holographic-progress"
import { Sparkles } from "@/components/sparkles"
import { CaregiverInterstitial } from "@/components/caregiver-interstitial"

export function AttachmentQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [caregiverExplanationShown, setCaregiverExplanationShown] = useState(false)

  // Find the index of the first caregiver question
  const firstCaregiverQuestionIndex = questions.findIndex(
    (q) => q.context === "primary_caregiver" || q.context === "secondary_caregiver",
  )

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNext = () => {
    // Check if the next step would be the first caregiver question and we haven't shown the explanation yet
    if (currentStep === firstCaregiverQuestionIndex - 1 && !caregiverExplanationShown) {
      setCaregiverExplanationShown(true)
      return
    }

    if (currentStep < questions.length - 1) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setIsLoading(false)
      }, 600)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setShowResults(true)
        setIsLoading(false)
      }, 1200)
    }
  }

  const handleCaregiverExplanationContinue = () => {
    setCaregiverExplanationShown(false)
    handleNext()
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1)
        setIsLoading(false)
      }, 600)
    }
  }

  const calculateResults = () => {
    // Initialize context-specific scores
    const contextScores: Record<string, { anxiety: number; avoidance: number; count: number }> = {
      partner: { anxiety: 0, avoidance: 0, count: 0 },
      primary_caregiver: { anxiety: 0, avoidance: 0, count: 0 },
      secondary_caregiver: { anxiety: 0, avoidance: 0, count: 0 },
      friends: { anxiety: 0, avoidance: 0, count: 0 },
      general: { anxiety: 0, avoidance: 0, count: 0 },
    }

    // Initialize weighted sums for composite scores
    let totalAnxietyWeightedSum = 0
    let totalAvoidanceWeightedSum = 0
    let totalAnxietyCount = 0
    let totalAvoidanceCount = 0

    // Validity checks
    let validityScore = 100
    let consistencyScore = 100

    // Check validity questions
    // Attention check - should be "SOMEWHAT AGREE" (value 5)
    if (answers[23] !== 5) {
      validityScore -= 30
    }

    // Consistency check - "never feel stress" should not be strongly agree
    if (answers[24] >= 6) {
      consistencyScore -= 30
    }

    // Process each question
    questions.forEach((question) => {
      if (question.id in answers && !question.isValidity) {
        let score = answers[question.id]
        const weight = question.weight || 1
        const context = question.context

        // Handle reverse-scored items
        if (reverseScoreItems.includes(question.id)) {
          score = 8 - score // Transform 1-7 to 7-1
        }

        // Add to context-specific scores
        if (question.dimension === "anxiety") {
          contextScores[context].anxiety += score
          contextScores[context].count += 1
          totalAnxietyWeightedSum += score * contextWeights[context]
          totalAnxietyCount += 1
        } else if (question.dimension === "avoidance") {
          contextScores[context].avoidance += score
          contextScores[context].count += 1
          totalAvoidanceWeightedSum += score * contextWeights[context]
          totalAvoidanceCount += 1
        }
      }
    })

    // Calculate average scores for each context
    const finalContextScores: Record<string, { anxiety: number; avoidance: number }> = {}

    Object.keys(contextScores).forEach((context) => {
      const anxietyAvg =
        contextScores[context].count > 0 ? contextScores[context].anxiety / contextScores[context].count : 0

      const avoidanceAvg =
        contextScores[context].count > 0 ? contextScores[context].avoidance / contextScores[context].count : 0

      finalContextScores[context] = {
        anxiety: anxietyAvg,
        avoidance: avoidanceAvg,
      }
    })

    // Calculate composite scores
    const compositeAnxietyScore = totalAnxietyCount > 0 ? totalAnxietyWeightedSum / totalAnxietyCount : 0

    const compositeAvoidanceScore = totalAvoidanceCount > 0 ? totalAvoidanceWeightedSum / totalAvoidanceCount : 0

    // Determine primary attachment style based on composite scores
    const primaryAttachmentStyle = determineAttachmentStyle(compositeAnxietyScore, compositeAvoidanceScore)
    const subtype = determineSubtype(compositeAnxietyScore, compositeAvoidanceScore, primaryAttachmentStyle)

    // Calculate reliability level
    const reliabilityLevel =
      validityScore >= 90 && consistencyScore >= 90
        ? "OPTIMAL"
        : validityScore >= 80 && consistencyScore >= 80
          ? "HIGH"
          : validityScore >= 70 && consistencyScore >= 70
            ? "MODERATE"
            : "LOW"

    return {
      compositeAnxietyScore,
      compositeAvoidanceScore,
      contextScores: finalContextScores,
      validityScore,
      consistencyScore,
      attachmentStyle: primaryAttachmentStyle,
      subtype,
      reliabilityLevel,
    }
  }

  const determineAttachmentStyle = (anxietyScore: number, avoidanceScore: number) => {
    if (anxietyScore <= 4 && avoidanceScore <= 4) {
      return "SECURE"
    } else if (anxietyScore > 4 && avoidanceScore <= 4) {
      return "ANXIOUS" // Changed from PREOCCUPIED
    } else if (anxietyScore <= 4 && avoidanceScore > 4) {
      return "AVOIDANT" // Changed from DISMISSING
    } else {
      return "DISORGANIZED" // Changed from FEARFUL
    }
  }

  const determineSubtype = (anxietyScore: number, avoidanceScore: number, style: string) => {
    // Secure subtypes
    if (style === "SECURE") {
      if (anxietyScore < 3 && avoidanceScore < 3) return "HIGHLY SECURE"
      if (anxietyScore >= 3) return "SECURE WITH ANXIOUS TENDENCIES"
      if (avoidanceScore >= 3) return "SECURE WITH AVOIDANT TENDENCIES"
      return "MODERATELY SECURE"
    }

    // Anxious subtypes (formerly Preoccupied)
    if (style === "ANXIOUS") {
      if (anxietyScore > 5.5) return "HIGHLY ANXIOUS (PREOCCUPIED)"
      return "MODERATELY ANXIOUS (PREOCCUPIED)"
    }

    // Avoidant subtypes (formerly Dismissing)
    if (style === "AVOIDANT") {
      if (avoidanceScore > 5.5) return "HIGHLY AVOIDANT (DISMISSIVE)"
      return "MODERATELY AVOIDANT (DISMISSIVE)"
    }

    // Disorganized subtypes (formerly Fearful)
    if (style === "DISORGANIZED") {
      if (anxietyScore > 5.5 && avoidanceScore > 5.5) return "HIGHLY DISORGANIZED (FEARFUL)"
      if (anxietyScore > avoidanceScore) return "DISORGANIZED WITH ANXIOUS TENDENCIES"
      return "DISORGANIZED WITH AVOIDANT TENDENCIES"
    }

    return "MIXED PROFILE"
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  if (showResults) {
    return <QuizResults results={calculateResults()} answers={answers} />
  }

  const currentQuestion = questions[currentStep]
  const isAnswered = currentQuestion.id in answers
  const isLastQuestion = currentStep === questions.length - 1

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="mb-3 flex justify-between font-sans text-sm text-white/80">
          <span className="flex items-center">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            QUESTION {currentStep + 1}/{questions.length}
          </span>
          <span className="flex items-center">
            PROGRESS: {Math.round(progress)}%
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
        </div>
        <HolographicProgress value={progress} />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-[400px] items-center justify-center"
          >
            <div className="text-center">
              <div className="relative mx-auto mb-4 h-16 w-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full border-2 border-blue-500 opacity-30"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-ping rounded-full bg-blue-500 opacity-20"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-blue-500"></div>
                </div>
              </div>
              <p className="font-sans text-sm text-white/80">PROCESSING</p>
            </div>
          </motion.div>
        ) : caregiverExplanationShown ? (
          <CaregiverInterstitial onContinue={handleCaregiverExplanationContinue} />
        ) : (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="mb-8 border-deep-blue bg-black/80 shadow-lg shadow-cyan-400/5">
              <div className="relative overflow-hidden rounded-lg border-t border-blue-500/20 p-6">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl"></div>

                <QuizQuestion
                  question={currentQuestion}
                  selectedValue={answers[currentQuestion.id] || 0}
                  onSelect={(value) => handleAnswer(currentQuestion.id, value)}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isLoading || caregiverExplanationShown}
          className="border-deep-blue bg-transparent font-sans text-white/80 hover:border-white hover:bg-white/5 hover:text-white"
        >
          <span className="mr-2 text-xs">◀</span>
          PREVIOUS
        </Button>
        {!caregiverExplanationShown && (
          <Button
            onClick={handleNext}
            disabled={!isAnswered || isLoading}
            className="relative overflow-hidden border border-blue-500/50 bg-deep-blue/40 font-sans text-white hover:bg-deep-blue/60"
          >
            {isLastQuestion ? (
              <>
                ANALYZE RESULTS
                <Sparkles className="ml-2" />
              </>
            ) : (
              <>
                CONTINUE
                <span className="ml-2 text-xs">▶</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
