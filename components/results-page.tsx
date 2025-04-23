"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { dimensionDescriptions, toolDescriptions } from "@/lib/descriptions"
import { motion } from "framer-motion"

interface ResultsPageProps {
  userName: string
  results: any
  onStartOver: () => void
}

export default function ResultsPage({ userName, results, onStartOver }: ResultsPageProps) {
  if (!results) return null

  const getChallengeColor = (score: number) => {
    if (score >= 4.5) return "bg-red-900/30 text-red-400 border-red-900"
    if (score >= 3.5) return "bg-orange-900/30 text-orange-400 border-orange-900"
    if (score >= 2.5) return "bg-yellow-900/30 text-yellow-400 border-yellow-900"
    if (score >= 1.5) return "bg-blue-900/30 text-blue-400 border-blue-900"
    return "bg-green-900/30 text-green-400 border-green-900"
  }

  const getChallengeLabel = (score: number) => {
    if (score >= 4.5) return "Critical Challenge"
    if (score >= 3.5) return "Significant Challenge"
    if (score >= 2.5) return "Moderate Challenge"
    if (score >= 1.5) return "Minor Challenge"
    return "Strength"
  }

  // Sort dimensions by score (highest first)
  const sortedDimensions = Object.keys(results.dimensions).sort(
    (a, b) => results.dimensions[b].score - results.dimensions[a].score,
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div className="text-center space-y-2" variants={item}>
        <h1 className="text-2xl font-bold text-white">{userName}'s Communication Assessment Results</h1>
        <p className="text-gray-400">
          Based on your responses, we've identified your key communication areas to focus on. Each area includes
          recommended tools from the Beyond Driven toolkit to help you strengthen these communication skills.
        </p>
      </motion.div>

      <motion.div className="space-y-6 mt-6" variants={container}>
        {sortedDimensions.map((dimension, index) => {
          const { score, tools } = results.dimensions[dimension]
          return (
            <motion.div
              key={dimension}
              variants={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-l-4 border-l-blue-500 bg-[#111111] border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-bold text-white">{dimension}</h2>
                    <Badge variant="outline" className={`${getChallengeColor(score)} px-3 py-1 text-sm font-medium`}>
                      {getChallengeLabel(score)} ({score.toFixed(1)}/5)
                    </Badge>
                  </div>
                  <p className="text-gray-400 mt-1">{dimensionDescriptions[dimension]}</p>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-gray-300 mb-3">Recommended Tools:</h3>
                  <div className="space-y-3">
                    {tools.map((tool: any, toolIndex: number) => (
                      <motion.div
                        key={tool.name}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + toolIndex * 0.05 }}
                      >
                        <Badge
                          className={
                            tool.priority === "High"
                              ? "bg-red-900/30 text-red-400 border-red-900 whitespace-nowrap"
                              : "bg-blue-900/30 text-blue-400 border-blue-900 whitespace-nowrap"
                          }
                        >
                          {tool.priority} Priority
                        </Badge>
                        <div>
                          <p className="font-semibold text-white">{tool.name}</p>
                          <p className="text-sm text-gray-400">{toolDescriptions[tool.name]}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div variants={item}>
        <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg mt-6">
          <h3 className="font-semibold text-blue-400 mb-2">Next Steps:</h3>
          <p className="text-gray-300">
            Focus on the high-priority tools for your top challenge areas. Working with a Beyond Driven coach will help
            you implement these tools effectively and track your progress.
          </p>
        </div>
      </motion.div>

      <motion.div className="flex justify-center mt-6" variants={item}>
        <Button
          onClick={onStartOver}
          variant="outline"
          className="px-6 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Start Over
        </Button>
      </motion.div>
    </motion.div>
  )
}
