"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SparkleProps {
  className?: string
}

export function Sparkles({ className }: SparkleProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; size: number; x: number; y: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const sparkle = {
        id: Date.now(),
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }

      setSparkles((current) => [...current, sparkle])

      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles((current) => current.filter((s) => s.id !== sparkle.id))
      }, 600)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="absolute inline-block h-[2px] w-[2px] rounded-full bg-cyan-400"
            style={{
              top: `${sparkle.y}%`,
              left: `${sparkle.x}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">✧</span>
    </span>
  )
}
