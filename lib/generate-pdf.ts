import { questions, reverseScoreItems } from "./quiz-data"

interface PdfGenerationProps {
  answers: Record<number, number>
  results: {
    compositeAnxietyScore: number
    compositeAvoidanceScore: number
    contextScores: Record<string, { anxiety: number; avoidance: number }>
    attachmentStyle: string
    subtype: string
    reliabilityLevel: string
  }
}

export async function generatePDF({ answers, results }: PdfGenerationProps) {
  try {
    // Dynamically import jsPDF only on the client side
    const { default: jsPDF } = await import("jspdf")
    // Dynamically import the autoTable plugin
    const { default: autoTable } = await import("jspdf-autotable")

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    // Helper function to add wrapped text
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const lines = doc.splitTextToSize(text, maxWidth)
      doc.text(lines, x, y)
      return y + lineHeight * lines.length
    }

    // Helper function to add section headers
    const addSectionHeader = (title: string, y: number) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(14)
      doc.setTextColor(0, 51, 102) // Dark blue for headers
      doc.text(title, margin, y)
      doc.setLineWidth(0.5)
      doc.setDrawColor(0, 123, 255) // Blue line
      doc.line(margin, y + 1, pageWidth - margin, y + 1)
      doc.setTextColor(0, 0, 0) // Reset to black
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      return y + 8
    }

    // Add header
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.setTextColor(0, 51, 102) // Dark blue
    doc.text("ATTACHMENT STYLE ASSESSMENT", pageWidth / 2, 20, { align: "center" })

    doc.setFontSize(16)
    doc.text("PERSONAL RESULTS", pageWidth / 2, 30, { align: "center" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0) // Reset to black
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 40, { align: "center" })

    // Add attachment style
    let y = 50
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.setTextColor(0, 51, 102) // Dark blue
    doc.text(`${results.attachmentStyle}`, pageWidth / 2, y, { align: "center" })

    y += 7
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.text(`Subtype: ${results.subtype}`, pageWidth / 2, y, { align: "center" })

    y += 10

    // Add scores
    doc.setFontSize(11)
    doc.text(`Anxiety Score: ${results.compositeAnxietyScore.toFixed(1)}`, margin, y)
    doc.text(`Avoidance Score: ${results.compositeAvoidanceScore.toFixed(1)}`, pageWidth - margin, y, {
      align: "right",
    })

    y += 6
    doc.text(`Assessment Reliability: ${results.reliabilityLevel}`, margin, y)

    y += 10

    // Context scores table
    y = addSectionHeader("RELATIONSHIP CONTEXT SCORES", y)
    y += 5

    const contextLabels = {
      partner: "Romantic Relationships",
      primary_caregiver: "Primary Caregiver",
      secondary_caregiver: "Secondary Caregiver",
      friends: "Friendships",
      general: "General Relationships",
    }

    // Use autotable for context scores
    const contextData: string[][] = []

    Object.entries(results.contextScores).forEach(([context, scores]) => {
      if (context in contextLabels) {
        const contextName = contextLabels[context as keyof typeof contextLabels]
        contextData.push([contextName, scores.anxiety.toFixed(1), scores.avoidance.toFixed(1)])
      }
    })

    autoTable(doc, {
      startY: y,
      head: [["Relationship Context", "Anxiety Score", "Avoidance Score"]],
      body: contextData,
      theme: "grid",
      headStyles: { fillColor: [0, 123, 255], textColor: [255, 255, 255] },
      styles: { halign: "center" },
      columnStyles: { 0: { halign: "left" } },
    })

    y = (doc as any).lastAutoTable.finalY + 10

    // Attachment Grid Explanation
    y = addSectionHeader("ATTACHMENT STYLE EXPLANATION", y)

    const attachmentExplanations = {
      SECURE:
        "Your Secure attachment style indicates you're generally comfortable with emotional closeness and independence. You likely trust others, communicate openly, and maintain healthy boundaries in relationships.",
      ANXIOUS:
        "Your Anxious attachment style suggests you value close relationships highly but may worry about whether others value you as much as you value them. You seek closeness and reassurance in relationships.",
      AVOIDANT:
        "Your Avoidant attachment style indicates you highly value independence and self-sufficiency. You may prefer to rely on yourself rather than others and might keep some emotional distance in relationships.",
      DISORGANIZED:
        "Your Disorganized attachment style suggests you desire close relationships but also feel uncomfortable with too much emotional intimacy. You may experience conflicting desires to be close while protecting yourself.",
    }

    const explanation =
      attachmentExplanations[results.attachmentStyle as keyof typeof attachmentExplanations] ||
      "Your attachment style combines elements from different patterns, suggesting your approach to relationships varies depending on context and specific relationships."

    y = addWrappedText(explanation, margin, y, contentWidth, 5)

    y += 8

    // Add explanation of the grid
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100) // Gray
    const gridExplanation =
      "Attachment styles are measured on two dimensions: anxiety (worry about relationships) and avoidance (discomfort with closeness). Your scores determine your position on the attachment grid, with each quadrant representing a different attachment style."

    y = addWrappedText(gridExplanation, margin, y, contentWidth, 5)

    y += 10

    // Check if we need a new page for growth steps
    if (y > 230) {
      doc.addPage()
      y = 20
    }

    // Growth Steps
    y = addSectionHeader("GROWTH STEPS", y)

    const growthSteps: Record<string, string[]> = {
      SECURE: [
        "Continue developing emotional awareness by noticing and naming your feelings in different situations.",
        "Use your relational skills to support others who may struggle with relationship security.",
        "Practice mindfulness during relationship challenges to maintain your secure patterns.",
      ],
      ANXIOUS: [
        "Work on developing internal sources of validation rather than always seeking reassurance from others.",
        "Practice recognizing and challenging anxious thoughts about relationships.",
        "Gradually build comfort with independence by engaging in fulfilling solo activities.",
      ],
      AVOIDANT: [
        "Practice identifying and expressing emotions, perhaps through journaling or therapy.",
        "Challenge yourself to share one personal thought or feeling each week with someone you trust.",
        "Pay attention to when you're pulling away in relationships and consider whether it's helpful.",
      ],
      DISORGANIZED: [
        "Focus on building consistency and trust with a few reliable people rather than seeking many connections.",
        "Practice self-compassion when relationship difficulties arise.",
        "Consider professional support to explore attachment patterns in a safe environment.",
      ],
    }

    const steps = growthSteps[results.attachmentStyle as keyof typeof growthSteps] || [
      "Identify which relationship contexts trigger different attachment responses.",
      "Build on moments when you feel more secure in relationships.",
      "Develop flexible strategies for different relationship situations.",
    ]

    steps.forEach((step, index) => {
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 0, 0)
      doc.text(`${index + 1}.`, margin, y)
      doc.setFont("helvetica", "normal")
      y = addWrappedText(step, margin + 7, y, contentWidth - 7, 5)
      y += 6
    })

    y += 5

    // Check if we need a new page for questions
    if (y > 230) {
      doc.addPage()
      y = 20
    }

    // Add questions and answers
    y = addSectionHeader("YOUR RESPONSES", y)
    y += 5

    const answerLabels = [
      "N/A",
      "STRONGLY DISAGREE",
      "DISAGREE",
      "SOMEWHAT DISAGREE",
      "NEUTRAL",
      "SOMEWHAT AGREE",
      "AGREE",
      "STRONGLY AGREE",
    ]

    // Filter questions to only include non-validity ones with answers
    const answeredQuestions = questions
      .filter((q) => !q.isValidity && answers[q.id] !== undefined)
      .sort((a, b) => a.id - b.id)

    // Prepare data for table
    const tableData = answeredQuestions.map((question) => {
      // Get raw answer value
      const rawAnswer = answers[question.id]

      // Format score
      const formattedAnswer = answerLabels[rawAnswer]

      // Dimension information
      let dimension = question.dimension.charAt(0).toUpperCase() + question.dimension.slice(1)
      if (reverseScoreItems.includes(question.id)) {
        dimension += " (Reverse Scored)"
      }

      return [`Q${question.id}`, question.text, formattedAnswer, dimension]
    })

    // Add responses table
    autoTable(doc, {
      startY: y,
      head: [["#", "Question", "Your Response", "Dimension"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 123, 255], textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: "auto" },
        2: { cellWidth: 35 },
        3: { cellWidth: 35 },
      },
      styles: { overflow: "linebreak", cellPadding: 2, fontSize: 9 },
    })

    // Add footer to all pages
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100) // Gray
      doc.text("Attachment Insight Assessment Results", margin, doc.internal.pageSize.getHeight() - 10)
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, {
        align: "right",
      })
    }

    // Save the PDF with a custom filename
    const filename = `Attachment_Style_Assessment_${results.attachmentStyle}_${new Date().toISOString().slice(0, 10)}.pdf`
    doc.save(filename)

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}
