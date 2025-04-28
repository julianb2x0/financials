"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import WelcomeScreen from "@/components/welcome-screen"
import QuestionSlide from "@/components/question-slide"
import ResultsPage from "@/components/results-page"
import ProgressBar from "@/components/progress-bar"
import { Card } from "@/components/ui/card"
import { calculateResults } from "@/lib/calculate-results"
import { questions } from "@/lib/questions"

export default function CommunicationAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userName, setUserName] = useState("")
  const [answers, setAnswers] = useState<number[]>(Array(15).fill(0))
  const [results, setResults] = useState<any>(null)
  const [direction, setDirection] = useState(0) // -1 for backward, 1 for forward

  // Total steps: welcome + 15 questions + results
  const totalSteps = 17

  const handleNameChange = (name: string) => {
    setUserName(name)
  }

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = value
    setAnswers(newAnswers)

    // Auto-advance to next question after selection with a short delay
    setTimeout(() => {
      handleNext()
    }, 500)
  }

  const handleNext = () => {
    if (currentStep === totalSteps - 2) {
      // Calculate results when moving to results page
      const calculatedResults = calculateResults(answers)
      setResults(calculatedResults)
    }
    setDirection(1)
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleStartOver = () => {
    setDirection(-1)
    setCurrentStep(0)
    setUserName("")
    setAnswers(Array(15).fill(0))
    setResults(null)
  }

  const getProgressPercentage = () => {
    if (currentStep === 0) return 0
    if (currentStep === totalSteps - 1) return 100
    return (currentStep / (totalSteps - 2)) * 100
  }

  // Slide transition variants
  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <motion.div
          key="welcome"
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <WelcomeScreen userName={userName} onNameChange={handleNameChange} onBegin={handleNext} />
        </motion.div>
      )
    } else if (currentStep === totalSteps - 1) {
      return (
        <motion.div
          key="results"
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ResultsPage userName={userName} results={results} onStartOver={handleStartOver} />
        </motion.div>
      )
    } else {
      // Question slides (1 to 15)
      const questionIndex = currentStep - 1
      return (
        <motion.div
          key={`question-${questionIndex}`}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <QuestionSlide
            question={questions[questionIndex]}
            questionNumber={questionIndex + 1}
            answer={answers[questionIndex]}
            onAnswerChange={(value) => handleAnswerChange(questionIndex, value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLastQuestion={questionIndex === questions.length - 1}
            totalQuestions={questions.length}
          />
        </motion.div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 text-gray-200">
      <div className="max-w-2xl mx-auto">
        <ProgressBar percentage={getProgressPercentage()} />
        <Card className="mt-6 p-6 bg-[#111111] border border-gray-800 shadow-xl text-gray-200 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            {renderStep()}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  )
}
