"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Heart, Home, Users, Network } from "lucide-react"
import { motion } from "framer-motion"

interface WelcomeScreenProps {
  userName: string
  onNameChange: (name: string) => void
  onBegin: () => void
}

export default function WelcomeScreen({ userName, onNameChange, onBegin }: WelcomeScreenProps) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    setIsButtonDisabled(userName.trim() === "")
  }, [userName])

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
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div className="text-center space-y-2" variants={item}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="bg-gray-800 p-2 rounded-md">
            <span className="text-2xl font-mono">{"{}"}</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Beyond Driven Communication</h1>
        </div>
        <p className="text-lg text-gray-400">
          Discover your communication strengths and learn how they impact your relationships
        </p>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8" variants={item}>
        <Card className="bg-[#111111] border border-gray-800 hover:border-gray-700 transition-all p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-blue-400">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Emotional Regulation</h3>
              <p className="text-gray-400">Manage emotions during communication</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#111111] border border-gray-800 hover:border-gray-700 transition-all p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-blue-400">
              <Home size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Boundaries & Assertion</h3>
              <p className="text-gray-400">Communicate needs and set limits</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#111111] border border-gray-800 hover:border-gray-700 transition-all p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-blue-400">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Empathy & Connection</h3>
              <p className="text-gray-400">Understand others and create connection</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#111111] border border-gray-800 hover:border-gray-700 transition-all p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-blue-400">
              <Network size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Conflict Navigation</h3>
              <p className="text-gray-400">Handle disagreements constructively</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-[#111111] border border-gray-800 p-6 rounded-xl mt-6">
          <p className="text-gray-300 mb-4">
            In about 5 minutes you'll learn how you communicate, react and grow with the people who matter.
          </p>

          <h3 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
            <span className="text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                <path d="M3.5 12h6"></path>
                <path d="M14.5 12h6"></path>
              </svg>
            </span>
            Insights You'll Gain
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Understand your key communication challenges and strengths</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>See which of the communication styles fits you—and the shades in-between</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Spot the habits that strengthen or strain your relationships</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Get concrete tips for building more effective communication</span>
            </li>
          </ul>
        </Card>
      </motion.div>

      <motion.div className="space-y-3 mt-6" variants={item}>
        <Label htmlFor="name" className="text-lg text-gray-300">
          Let's get started. What's your name?
        </Label>
        <Input
          id="name"
          type="text"
          value={userName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your name"
          className="text-lg py-6 bg-[#1a1a1a] border-gray-700 text-white"
        />
      </motion.div>

      <motion.div className="flex justify-center mt-8" variants={item}>
        <Button
          onClick={onBegin}
          disabled={isButtonDisabled}
          className="px-8 py-6 text-lg bg-gray-200 hover:bg-white text-black rounded-full font-medium transition-all duration-200 disabled:opacity-50"
        >
          Begin Assessment
        </Button>
      </motion.div>
    </motion.div>
  )
}
