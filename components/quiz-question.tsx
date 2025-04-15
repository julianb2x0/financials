"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuestionType } from "@/lib/quiz-data"
import { motion } from "framer-motion"

interface QuizQuestionProps {
  question: QuestionType
  selectedValue: number
  onSelect: (value: number) => void
}

export function QuizQuestion({ question, selectedValue, onSelect }: QuizQuestionProps) {
  const options = [
    { value: 1, label: "STRONGLY DISAGREE" },
    { value: 2, label: "DISAGREE" },
    { value: 3, label: "SOMEWHAT DISAGREE" },
    { value: 4, label: "NEUTRAL" },
    { value: 5, label: "SOMEWHAT AGREE" },
    { value: 6, label: "AGREE" },
    { value: 7, label: "STRONGLY AGREE" },
    // Add N/A option for caregiver questions
    ...(question.context === "secondary_caregiver" ? [{ value: 0, label: "NOT APPLICABLE" }] : []),
  ]

  // Remove the duplicate caregiver explanation from the QuizQuestion component
  const showCaregiverExplanation = question.context === "primary_caregiver" && question.id === 7

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {question.category && (
          <span className="rounded-sm border border-blue-500/30 bg-deep-blue/30 px-3 py-1 text-xs font-medium tracking-wider text-blue-500">
            {question.category}
          </span>
        )}
        {question.context === "primary_caregiver" && (
          <span className="rounded-sm border border-blue-500/30 bg-deep-blue/30 px-3 py-1 text-xs font-medium tracking-wider text-blue-500">
            PRIMARY CAREGIVER
          </span>
        )}
        {question.context === "secondary_caregiver" && (
          <span className="rounded-sm border border-blue-500/30 bg-deep-blue/30 px-3 py-1 text-xs font-medium tracking-wider text-blue-500">
            SECONDARY CAREGIVER
          </span>
        )}
      </div>
      <h3 className="mb-6 font-sans text-xl font-medium leading-relaxed tracking-normal text-white">{question.text}</h3>

      <RadioGroup
        value={selectedValue.toString()}
        onValueChange={(value) => onSelect(Number.parseInt(value))}
        className="space-y-3"
      >
        {options.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.01, boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.99 }}
            className={`flex cursor-pointer items-center rounded-sm border p-4 transition-all duration-300 ${
              selectedValue === option.value
                ? "border-blue-500 bg-deep-blue/40 shadow-[0_0_10px_rgba(0,123,255,0.15)]"
                : "border-deep-blue/60 bg-black/40 hover:border-white hover:bg-white/5"
            }`}
            onClick={() => onSelect(option.value)}
          >
            <RadioGroupItem
              value={option.value.toString()}
              id={`q${question.id}-option${option.value}`}
              className="border-gray-400 text-blue-500"
            />
            <Label
              htmlFor={`q${question.id}-option${option.value}`}
              className="w-full cursor-pointer pl-3 font-sans text-base font-medium tracking-normal text-white"
            >
              {option.label}
            </Label>
            {option.value !== 0 && (
              <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 text-xs font-medium text-white">
                {option.value}
              </div>
            )}
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  )
}
