"use client"

import { useEffect, useRef, useState } from "react"

interface RelationshipRadarChartProps {
  contextScores: Record<string, { anxiety: number; avoidance: number }>
}

export function RelationshipRadarChart({ contextScores }: RelationshipRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{ context: string; dimension: string; value: number } | null>(null)

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

    // Update the background to white instead of dark
    ctx.fillStyle = "#FFFFFF" // White background instead of dark
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Set up radar chart
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) * 0.75

    // Update grid lines to be more visible on white background
    ctx.strokeStyle = "rgba(14, 27, 46, 0.2)" // Lighter grid lines for white background
    ctx.lineWidth = 1
    ctx.setLineDash([2, 2])

    for (let i = 1; i <= 7; i++) {
      const circleRadius = (radius / 7) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.setLineDash([])

    // Define the contexts to display
    const contexts = ["partner", "primary_caregiver", "secondary_caregiver", "friends", "general"]
    const contextLabels = {
      partner: "PARTNER",
      primary_caregiver: "PRIMARY CAREGIVER",
      secondary_caregiver: "SECONDARY CAREGIVER",
      friends: "FRIENDS",
      general: "GENERAL",
    }

    // Store points for hover detection
    const anxietyPointsData: Array<{ x: number; y: number; context: string; value: number }> = []
    const avoidancePointsData: Array<{ x: number; y: number; context: string; value: number }> = []

    // Calculate angle step outside the contexts loop
    const angleStep = (Math.PI * 2) / contexts.length

    // Update the axis labels to ensure they're not cut off
    contexts.forEach((context, i) => {
      const angle = i * angleStep - Math.PI / 2 // Start from top

      // Draw axis line
      ctx.beginPath()
      ctx.strokeStyle = "#E0E0E0"
      ctx.lineWidth = 1
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()

      // Draw axis label with more padding
      const labelX = centerX + Math.cos(angle) * (radius + 25)
      const labelY = centerY + Math.sin(angle) * (radius + 25)

      ctx.fillStyle = "#333333" // Dark text for white background
      ctx.font = "bold 12px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(contextLabels[context], labelX, labelY)
    })

    // Draw anxiety data
    const anxietyColor = "#FF6B6B" // Bright coral red
    const anxietyPoints: [number, number][] = []
    contexts.forEach((context, i) => {
      const score = contextScores[context]?.anxiety || 0
      const angle = i * angleStep - Math.PI / 2
      const distance = (score / 7) * radius

      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      anxietyPoints.push([x, y])

      // Store point for hover detection
      anxietyPointsData.push({ x, y, context, value: score })
    })

    // Draw anxiety polygon
    ctx.beginPath()
    anxietyPoints.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point[0], point[1])
      } else {
        ctx.lineTo(point[0], point[1])
      }
    })
    ctx.closePath()
    ctx.fillStyle = "rgba(255, 107, 107, 0.3)"
    ctx.fill()
    ctx.strokeStyle = anxietyColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw anxiety points
    anxietyPoints.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point[0], point[1], 4, 0, Math.PI * 2)
      ctx.fillStyle = anxietyColor
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 1.5
      ctx.fill()
      ctx.stroke()
    })

    // Draw avoidance data
    const avoidanceColor = "#007BFF" // Vibrant blue
    const avoidancePoints: [number, number][] = []
    contexts.forEach((context, i) => {
      const score = contextScores[context]?.avoidance || 0
      const angle = i * angleStep - Math.PI / 2
      const distance = (score / 7) * radius

      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      avoidancePoints.push([x, y])

      // Store point for hover detection
      avoidancePointsData.push({ x, y, context, value: score })
    })

    // Draw avoidance polygon
    ctx.beginPath()
    avoidancePoints.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point[0], point[1])
      } else {
        ctx.lineTo(point[0], point[1])
      }
    })
    ctx.closePath()
    ctx.fillStyle = "rgba(0, 123, 255, 0.3)"
    ctx.fill()
    ctx.strokeStyle = avoidanceColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw avoidance points
    avoidancePoints.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point[0], point[1], 4, 0, Math.PI * 2)
      ctx.fillStyle = avoidanceColor
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 1.5
      ctx.fill()
      ctx.stroke()
    })

    // Modify the axis label positioning to prevent cut-off
    ctx.fillStyle = "#999999"
    ctx.font = "10px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("0", centerX, centerY)
    ctx.fillText("7", centerX, centerY - radius - 10) // Move "7" label further up

    // Draw legend
    const legendX = 20
    const legendY = 20
    const legendWidth = 15
    const legendHeight = 15
    const legendSpacing = 5
    const legendTextOffset = 25

    // Anxiety legend
    ctx.beginPath()
    ctx.rect(legendX, legendY, legendWidth, legendHeight)
    ctx.fillStyle = anxietyColor
    ctx.fill()

    // Update the legend text color for white background
    ctx.fillStyle = "#333333" // Dark text for white background
    ctx.font = "14px Inter, sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("ANXIETY", legendX + legendTextOffset, legendY + legendHeight / 2)

    // Avoidance legend
    ctx.beginPath()
    ctx.rect(legendX, legendY + legendHeight + legendSpacing, legendWidth, legendHeight)
    ctx.fillStyle = avoidanceColor
    ctx.fill()

    ctx.fillStyle = "#333333"
    ctx.font = "14px Inter, sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("AVOIDANCE", legendX + legendTextOffset, legendY + legendHeight + legendSpacing + legendHeight / 2)

    // Draw hover tooltip if a point is hovered
    if (hoveredPoint) {
      const tooltipX = 20
      const tooltipY = rect.height - 60
      const tooltipWidth = 180
      const tooltipHeight = 40
      const tooltipRadius = 4

      // Update tooltip background for better visibility
      ctx.beginPath()
      ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, tooltipRadius)
      ctx.fillStyle = "rgba(0, 123, 255, 0.8)" // Blue background for tooltip
      ctx.fill()

      // Draw tooltip text
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "12px Inter, sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      // Format context name for display
      let contextDisplay = hoveredPoint.context
      if (contextDisplay === "primary_caregiver") contextDisplay = "Primary Caregiver"
      if (contextDisplay === "secondary_caregiver") contextDisplay = "Secondary Caregiver"

      ctx.fillText(`${contextDisplay.toUpperCase()}: ${hoveredPoint.dimension}`, tooltipX + 10, tooltipY + 15)
      ctx.fillText(`Score: ${hoveredPoint.value.toFixed(1)}`, tooltipX + 10, tooltipY + 35)
    }

    // Add mouse move event listener for hover effects
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // Check if mouse is over any data point
      let found = false

      // Check anxiety points
      for (const point of anxietyPointsData) {
        const distance = Math.sqrt(Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2))
        if (distance <= 10) {
          setHoveredPoint({
            context: point.context,
            dimension: "Anxiety",
            value: point.value,
          })
          found = true
          break
        }
      }

      // Check avoidance points if no anxiety point was hovered
      if (!found) {
        for (const point of avoidancePointsData) {
          const distance = Math.sqrt(Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2))
          if (distance <= 10) {
            setHoveredPoint({
              context: point.context,
              dimension: "Avoidance",
              value: point.value,
            })
            found = true
            break
          }
        }
      }

      // Clear hover state if no point is hovered
      if (!found) {
        setHoveredPoint(null)
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [contextScores, hoveredPoint])

  return (
    <div className="relative rounded-md border border-deep-blue bg-white p-4 shadow-sm">
      <canvas ref={canvasRef} className="h-64 w-full" />
      <div className="absolute bottom-2 right-2">
        <div className="group relative inline-block">
          <div className="flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-600">
            ?
          </div>
          <div className="absolute bottom-full right-0 mb-2 hidden w-48 rounded-md border border-gray-200 bg-white p-2 text-xs text-gray-600 shadow-md group-hover:block">
            This radar chart shows how your anxiety and avoidance levels vary across different relationship contexts.
            Higher scores (further from center) indicate stronger anxiety or avoidance tendencies.
          </div>
        </div>
      </div>
    </div>
  )
}
