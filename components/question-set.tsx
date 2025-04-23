"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: number
  text: string
}

interface QuestionSetProps {
  questions: Question[]
  startIndex: number
  answers: number[]
  onAnswerChange: (questionIndex: number, value: number) => void
  onNext: () => void
  onPrevious: () => void
  isLastSet?: boolean
}

export default function QuestionSet({
  questions,
  startIndex,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  isLastSet = false,
}: QuestionSetProps) {
  const isNextDisabled = questions.some((_, index) => answers[startIndex + index] === 0)

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {questions.map((question, index) => {
          const questionIndex = startIndex + index
          return (
            <div key={question.id} className="space-y-4">
              <h3 className="text-lg font-medium text-white">
                {questionIndex + 1}. {question.text}
              </h3>
              <RadioGroup
                value={answers[questionIndex].toString()}
                onValueChange={(value) => onAnswerChange(questionIndex, Number.parseInt(value))}
                className="flex justify-between space-x-1 pt-2"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <RadioGroupItem value={value.toString()} id={`q${questionIndex}-${value}`} className="sr-only" />
                      <Label
                        htmlFor={`q${questionIndex}-${value}`}
                        className={`flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border-2 
                          ${
                            answers[questionIndex] === value
                              ? "bg-cyan-500 text-black border-cyan-500"
                              : "bg-[#1a1a1a] text-gray-300 border-gray-700 hover:border-cyan-700"
                          }`}
                      >
                        {value}
                      </Label>
                    </div>
                    <span className="text-xs text-gray-400">
                      {value === 1 && "Not at all"}
                      {value === 2 && "Rarely"}
                      {value === 3 && "Sometimes"}
                      {value === 4 && "Often"}
                      {value === 5 && "Always"}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="px-6 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={isNextDisabled}
          className="px-6 bg-gray-200 hover:bg-white text-black rounded-full"
        >
          {isLastSet ? "See Results" : "Next"}
        </Button>
      </div>
    </div>
  )
}
