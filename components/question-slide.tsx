"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface Question {
  id: number
  text: string
  dimension: string
}

interface QuestionSlideProps {
  question: Question
  questionNumber: number
  answer: number
  onAnswerChange: (value: number) => void
  onNext: () => void
  onPrevious: () => void
  isLastQuestion: boolean
  totalQuestions: number
}

export default function QuestionSlide({
  question,
  questionNumber,
  answer,
  onAnswerChange,
  onNext,
  onPrevious,
  isLastQuestion,
  totalQuestions,
}: QuestionSlideProps) {
  return (
    <div className="space-y-8">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-blue-400 text-sm mb-1">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2 className="text-xl font-medium text-white">{question.text}</h2>
      </motion.div>

      <RadioGroup
        value={answer ? answer.toString() : ""}
        onValueChange={(value) => onAnswerChange(Number.parseInt(value))}
        className="grid grid-cols-1 gap-3 pt-2"
      >
        {[1, 2, 3, 4, 5].map((value, index) => (
          <motion.div
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <RadioGroupItem value={value.toString()} id={`q${question.id}-${value}`} className="sr-only" />
            <Label
              htmlFor={`q${question.id}-${value}`}
              className={`flex items-center justify-between w-full p-4 rounded-lg cursor-pointer border 
                ${
                  answer === value
                    ? "bg-[#1a1a1a] text-white border-blue-500"
                    : "bg-[#1a1a1a] text-gray-300 border-gray-700 hover:border-gray-600"
                }`}
            >
              <span className="text-base">
                {value === 1
                  ? "Not at all"
                  : value === 2
                    ? "Rarely"
                    : value === 3
                      ? "Sometimes"
                      : value === 4
                        ? "Often"
                        : "Always"}
              </span>
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full 
                ${answer === value ? "bg-blue-500 text-black" : "bg-[#222222] text-gray-400"}`}
              >
                {value}
              </span>
            </Label>
          </motion.div>
        ))}
      </RadioGroup>

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="px-6 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Previous
        </Button>
        <Button onClick={onNext} disabled={!answer} className="px-6 bg-gray-200 hover:bg-white text-black rounded-full">
          {isLastQuestion ? "See Results" : "Next"}
        </Button>
      </div>
    </div>
  )
}
