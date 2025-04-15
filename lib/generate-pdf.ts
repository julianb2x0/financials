import jsPDF from "jspdf"
import { questions } from "./quiz-data"
import { getAttachmentDescription } from "./attachment-descriptions"

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

export function generatePDF({ answers, results }: PdfGenerationProps) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2

  // Helper function for text wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, x, y)
    return y + lineHeight * lines.length
  }

  // Helper function for adding a section title
  const addSectionTitle = (title: string, y: number) => {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text(title, margin, y)
    doc.setLineWidth(0.5)
    doc.line(margin, y + 1, pageWidth - margin, y + 1)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    return y + 8
  }

  // Add header
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text("ATTACHMENT STYLE ASSESSMENT RESULTS", pageWidth / 2, 20, { align: "center" })

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 27, { align: "center" })

  // Add primary results
  let y = 35
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text("YOUR ATTACHMENT STYLE", margin, y)
  y += 8

  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  doc.text(`${results.attachmentStyle}`, margin, y)
  y += 7

  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  doc.text(`Subtype: ${results.subtype}`, margin, y)
  y += 7

  doc.setFontSize(10)
  doc.text(`Anxiety Score: ${results.compositeAnxietyScore.toFixed(1)}`, margin, y)
  y += 5
  doc.text(`Avoidance Score: ${results.compositeAvoidanceScore.toFixed(1)}`, margin, y)
  y += 5
  doc.text(`Assessment Reliability: ${results.reliabilityLevel}`, margin, y)
  y += 10

  // Add description
  const description = getAttachmentDescription(results.attachmentStyle)
  y = addSectionTitle("WHAT THIS MEANS", y)
  y = addWrappedText(description.summary, margin, y, contentWidth, 5)
  y += 8

  // Add context-specific scores
  y = addSectionTitle("RELATIONSHIP CONTEXT SCORES", y)

  const contextLabels = {
    partner: "Romantic Relationships",
    primary_caregiver: "Primary Caregiver",
    secondary_caregiver: "Secondary Caregiver",
    friends: "Friendships",
    general: "General Relationships",
  }

  Object.entries(results.contextScores).forEach(([context, scores]) => {
    if (context in contextLabels) {
      doc.setFont("helvetica", "bold")
      doc.text(`${contextLabels[context as keyof typeof contextLabels]}:`, margin, y)
      y += 5
      doc.setFont("helvetica", "normal")
      doc.text(`Anxiety: ${scores.anxiety.toFixed(1)}   Avoidance: ${scores.avoidance.toFixed(1)}`, margin + 5, y)
      y += 7
    }
  })

  y += 5

  // Add growth tips
  y = addSectionTitle("GROWTH STEPS", y)

  description.growthTips.forEach((tip, index) => {
    if (y > 250) {
      doc.addPage()
      y = 20
    }

    doc.setFont("helvetica", "bold")
    doc.text(`${index + 1}. ${tip.title}`, margin, y)
    y += 5

    doc.setFont("helvetica", "normal")
    y = addWrappedText(tip.description, margin + 5, y, contentWidth - 5, 5)
    y += 7
  })

  // Check if we need a new page for questions and answers
  if (y > 200) {
    doc.addPage()
    y = 20
  }

  // Add questions and answers
  y = addSectionTitle("YOUR RESPONSES", y)
  y += 5

  // Filter out validity questions
  const answeredQuestions = questions.filter((q) => !q.isValidity && q.id in answers).sort((a, b) => a.id - b.id)

  answeredQuestions.forEach((question, index) => {
    if (y > 250) {
      doc.addPage()
      y = 20
    }

    const answer = answers[question.id]
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

    doc.setFont("helvetica", "bold")
    doc.text(`Q${index + 1}: `, margin, y)

    doc.setFont("helvetica", "normal")
    y = addWrappedText(question.text, margin + 10, y, contentWidth - 10, 5)
    y += 5

    doc.text(`Answer: ${answerLabels[answer]}`, margin + 10, y)
    y += 7
  })

  // Add footer
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.text("Attachment Insight Assessment Results", margin, doc.internal.pageSize.getHeight() - 10)
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, {
      align: "right",
    })
  }

  // Save the PDF
  doc.save("Attachment_Style_Assessment_Results.pdf")
}
