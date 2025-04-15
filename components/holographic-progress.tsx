"use client"

import { useEffect, useRef } from "react"

interface HolographicProgressProps {
  value: number
}

export function HolographicProgress({ value }: HolographicProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw background
    ctx.fillStyle = "#0E1B2E"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw grid lines
    ctx.strokeStyle = "rgba(0, 123, 255, 0.1)"
    ctx.lineWidth = 0.5

    const gridSize = 10
    for (let i = 0; i <= rect.width; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, rect.height)
      ctx.stroke()
    }

    // Draw progress
    const progressWidth = (value / 100) * rect.width

    // Draw progress background glow
    const gradient = ctx.createLinearGradient(0, 0, progressWidth, 0)
    gradient.addColorStop(0, "rgba(0, 123, 255, 0.1)")
    gradient.addColorStop(1, "rgba(0, 123, 255, 0.3)")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, progressWidth, rect.height)

    // Draw progress line
    ctx.strokeStyle = "#007BFF"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(progressWidth, 0)
    ctx.lineTo(progressWidth, rect.height)
    ctx.stroke()

    // Add glow effect to progress line
    ctx.shadowColor = "#007BFF"
    ctx.shadowBlur = 10
    ctx.strokeStyle = "#007BFF"
    ctx.beginPath()
    ctx.moveTo(progressWidth, 0)
    ctx.lineTo(progressWidth, rect.height)
    ctx.stroke()
    ctx.shadowBlur = 0

    // Draw particles along progress line
    const particleCount = 5
    ctx.fillStyle = "#007BFF"

    for (let i = 0; i < particleCount; i++) {
      const y = (rect.height / particleCount) * i + Math.random() * 5
      const size = 1 + Math.random() * 2

      ctx.beginPath()
      ctx.arc(progressWidth, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [value])

  return <canvas ref={canvasRef} className="h-2 w-full rounded-sm" style={{ height: "8px" }} />
}
