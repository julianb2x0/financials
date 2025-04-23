interface Dimension {
  score: number
  tools: Array<{
    name: string
    priority: string
  }>
}

interface Results {
  dimensions: {
    [key: string]: Dimension
  }
}

export function calculateResults(answers: number[]): Results {
  // Calculate dimension scores
  const emotionalRegulationScore = (answers[0] + answers[1] + answers[10]) / 3
  const boundariesScore = (answers[2] + answers[3] + answers[11]) / 3
  const empathyScore = (answers[4] + answers[5] + answers[12]) / 3
  const conflictScore = (answers[6] + answers[7] + answers[13]) / 3
  const vulnerabilityScore = (answers[8] + answers[9] + answers[14]) / 3

  // Determine tool priorities based on individual question scores
  const results: Results = {
    dimensions: {
      "Emotional Regulation": {
        score: emotionalRegulationScore,
        tools: [
          {
            name: "RAIN Technique",
            priority: answers[0] > 3 ? "High" : "Medium",
          },
          {
            name: "Downshift Technique",
            priority: answers[1] > 3 ? "High" : "Medium",
          },
          {
            name: "Emotional Regulation Tracker",
            priority: "Medium",
          },
        ],
      },
      "Boundaries & Assertion": {
        score: boundariesScore,
        tools: [
          {
            name: "Sandbox Technique",
            priority: answers[2] > 3 ? "High" : "Medium",
          },
          {
            name: "Pull the Plug Technique",
            priority: answers[3] > 3 ? "High" : "Medium",
          },
          {
            name: "Boundaries & Standards Exercise",
            priority: "Medium",
          },
        ],
      },
      "Empathy & Connection": {
        score: empathyScore,
        tools: [
          {
            name: "Empathy Bridge",
            priority: answers[4] > 3 ? "High" : "Medium",
          },
          {
            name: "X-Ray Vision",
            priority: answers[5] > 3 ? "High" : "Medium",
          },
          {
            name: "Two Birds, One Stone",
            priority: "Medium",
          },
        ],
      },
      "Conflict Navigation": {
        score: conflictScore,
        tools: [
          {
            name: "Fight Style Analysis",
            priority: answers[6] > 3 ? "High" : "Medium",
          },
          {
            name: "Conflict Navigation Framework",
            priority: answers[7] > 3 ? "High" : "Medium",
          },
          {
            name: "Trigger-to-Resolution Communication Model",
            priority: "Medium",
          },
        ],
      },
      "Vulnerability & Authentic Expression": {
        score: vulnerabilityScore,
        tools: [
          {
            name: "Cognitive Reprogramming Journal",
            priority: answers[8] > 3 ? "High" : "Medium",
          },
          {
            name: "Breaking the People-Pleasing Cycle",
            priority: answers[9] > 3 ? "High" : "Medium",
          },
          {
            name: "The Box Technique",
            priority: "Medium",
          },
        ],
      },
    },
  }

  return results
}
