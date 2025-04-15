"use client"

import { useEffect, useRef } from "react"

interface HolographicOrbsProps {
  attachmentStyle: string
}

export function HolographicOrbs({ attachmentStyle }: HolographicOrbsProps) {
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
    ctx.fillStyle = "#0A0A0A"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw grid lines
    ctx.strokeStyle = "rgba(14, 27, 46, 0.5)"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let y = 0; y < rect.height; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    // Create orbs based on attachment style
    const orbCount = 100
    const orbSize = 2
    let orbColor = "#007BFF"
    let pattern = "random"

    switch (attachmentStyle) {
      case "SECURE":
        pattern = "balanced"
        orbColor = "#007BFF"
        break
      case "PREOCCUPIED":
        pattern = "clustered"
        orbColor = "#007BFF"
        break
      case "DISMISSING":
        pattern = "scattered"
        orbColor = "#007BFF"
        break
      case "FEARFUL":
        pattern = "chaotic"
        orbColor = "#007BFF"
        break
      default:
        pattern = "random"
    }

    // Generate orb positions based on pattern
    const orbs = []

    for (let i = 0; i < orbCount; i++) {
      let x, y, size

      switch (pattern) {
        case "balanced":
          // Create a balanced, harmonious pattern
          const angle = (i / orbCount) * Math.PI * 2
          const radius = 50 + Math.random() * 30
          x = rect.width / 2 + Math.cos(angle) * radius
          y = rect.height / 2 + Math.sin(angle) * radius
          size = 1 + Math.random() * 2
          break

        case "clustered":
          // Create clusters of orbs (anxious attachment)
          const clusterCount = 3
          const clusterIndex = Math.floor(i / (orbCount / clusterCount))
          const clusterX = (rect.width / (clusterCount + 1)) * (clusterIndex + 1)
          const clusterY = rect.height / 2
          x = clusterX + (Math.random() - 0.5) * 80
          y = clusterY + (Math.random() - 0.5) * 80
          size = 1 + Math.random() * 2
          break

        case "scattered":
          // Create a scattered pattern (avoidant attachment)
          x = Math.random() * rect.width
          y = Math.random() * rect.height

          // Avoid center area
          while (Math.abs(x - rect.width / 2) < rect.width / 4 && Math.abs(y - rect.height / 2) < rect.height / 4) {
            x = Math.random() * rect.width
            y = Math.random() * rect.height
          }

          size = 1 + Math.random() * 1.5
          break

        case "chaotic":
          // Create a chaotic pattern (fearful attachment)
          x = Math.random() * rect.width
          y = Math.random() * rect.height

          // Create some clusters and some scattered
          if (i % 3 === 0) {
            x = rect.width / 4 + (Math.random() - 0.5) * 60
            y = rect.height / 4 + (Math.random() - 0.5) * 60
          } else if (i % 3 === 1) {
            x = (rect.width / 4) * 3 + (Math.random() - 0.5) * 60
            y = (rect.height / 4) * 3 + (Math.random() - 0.5) * 60
          }

          size = 1 + Math.random() * 2
          break

        default:
          // Random pattern
          x = Math.random() * rect.width
          y = Math.random() * rect.height
          size = 1 + Math.random() * 2
      }

      orbs.push({ x, y, size, alpha: 0.3 + Math.random() * 0.7 })
    }

    // Draw orbs
    orbs.forEach((orb) => {
      ctx.beginPath()
      ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
      ctx.fillStyle = orbColor.replace(")", `, ${orb.alpha})`)
      ctx.fill()

      // Add glow
      ctx.shadowColor = orbColor
      ctx.shadowBlur = 5
      ctx.beginPath()
      ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // Draw connecting lines between nearby orbs
    ctx.strokeStyle = orbColor.replace(")", ", 0.2)")
    ctx.lineWidth = 0.5

    for (let i = 0; i < orbs.length; i++) {
      for (let j = i + 1; j < orbs.length; j++) {
        const dx = orbs[i].x - orbs[j].x
        const dy = orbs[i].y - orbs[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 40) {
          ctx.beginPath()
          ctx.moveTo(orbs[i].x, orbs[i].y)
          ctx.lineTo(orbs[j].x, orbs[j].y)
          ctx.stroke()
        }
      }
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Draw background
      ctx.fillStyle = "#0A0A0A"
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(14, 27, 46, 0.5)"
      ctx.lineWidth = 0.5

      // Horizontal grid lines
      for (let y = 0; y < rect.height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(rect.width, y)
        ctx.stroke()
      }

      // Update orbs
      orbs.forEach((orb) => {
        orb.x += (Math.random() - 0.5) * 0.5
        orb.y += (Math.random() - 0.5) * 0.5
        orb.alpha = Math.max(0.2, Math.min(1, orb.alpha + (Math.random() - 0.5) * 0.05))
      })

      // Draw orbs
      orbs.forEach((orb) => {
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fillStyle = orbColor.replace(")", `, ${orb.alpha})`)
        ctx.fill()

        // Add glow
        ctx.shadowColor = orbColor
        ctx.shadowBlur = 5
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw connecting lines between nearby orbs
      ctx.strokeStyle = orbColor.replace(")", ", 0.2)")
      ctx.lineWidth = 0.5

      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x
          const dy = orbs[i].y - orbs[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 40) {
            ctx.beginPath()
            ctx.moveTo(orbs[i].x, orbs[i].y)
            ctx.lineTo(orbs[j].x, orbs[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [attachmentStyle])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute bottom-2 right-2">
        <div className="group relative inline-block">
          <div className="flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-cyan-400/30 bg-deep-blue/30 text-xs text-cyan-400">
            ?
          </div>
          <div className="absolute bottom-full right-0 mb-2 hidden w-48 rounded-sm border border-cyan-400/20 bg-black/90 p-2 text-xs text-frosted-gray group-hover:block">
            This visualization represents your attachment pattern.
            {attachmentStyle === "SECURE" &&
              "The balanced, harmonious arrangement reflects your stable approach to relationships."}
            {attachmentStyle === "PREOCCUPIED" &&
              "The clustered pattern shows your tendency to seek closeness and connection."}
            {attachmentStyle === "DISMISSING" &&
              "The scattered pattern indicates your preference for independence and emotional distance."}
            {attachmentStyle === "FEARFUL" &&
              "The mixed pattern reflects your conflicting desires for both closeness and distance."}
          </div>
        </div>
      </div>
    </div>
  )
}
