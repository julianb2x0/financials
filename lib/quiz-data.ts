export interface QuestionType {
  id: number
  text: string
  category: string
  context: "general" | "partner" | "primary_caregiver" | "secondary_caregiver" | "friends"
  dimension: "anxiety" | "avoidance" | "validity"
  weight: number
  isValidity?: boolean
}

export const questions: QuestionType[] = [
  // PARTNER/ROMANTIC RELATIONSHIP QUESTIONS (Weight: 1.5)
  {
    id: 1,
    text: "I worry my romantic partner might abandon me.",
    category: "ROMANTIC",
    context: "partner",
    dimension: "anxiety",
    weight: 1.5,
  },
  {
    id: 2,
    text: "I feel uncomfortable when my romantic partner wants deep emotional closeness.",
    category: "ROMANTIC",
    context: "partner",
    dimension: "avoidance",
    weight: 1.5,
  },
  {
    id: 3,
    text: "When my partner has been distant lately, I fear this means they want out of the relationship.",
    category: "ROMANTIC",
    context: "partner",
    dimension: "anxiety",
    weight: 1.5,
  },
  {
    id: 4,
    text: "I prefer to maintain some emotional distance in romantic relationships.",
    category: "ROMANTIC",
    context: "partner",
    dimension: "avoidance",
    weight: 1.5,
  },
  {
    id: 5,
    text: "I need frequent reassurance that my partner truly cares about me.",
    category: "ROMANTIC",
    context: "partner",
    dimension: "anxiety",
    weight: 1.5,
  },
  {
    id: 6,
    text: "I find it difficult to depend on romantic partners.",
    category: "ROMANTIC",
    context: "partner",
    dimension: "avoidance",
    weight: 1.5,
  },

  // PRIMARY CAREGIVER RELATIONSHIP QUESTIONS (Weight: 1.3)
  {
    id: 7,
    text: "I felt understood and supported by my primary caregiver growing up.",
    category: "FAMILY",
    context: "primary_caregiver",
    dimension: "avoidance",
    weight: 1.3,
    // This is reverse-scored in the calculation
  },
  {
    id: 8,
    text: "I sometimes feel anxious about how my primary caregiver will react when I express emotions.",
    category: "FAMILY",
    context: "primary_caregiver",
    dimension: "anxiety",
    weight: 1.3,
  },
  {
    id: 9,
    text: "I find it easy to be emotionally open with my primary caregiver.",
    category: "FAMILY",
    context: "primary_caregiver",
    dimension: "avoidance",
    weight: 1.3,
    // This is reverse-scored in the calculation
  },
  {
    id: 10,
    text: "I worry that my primary caregiver might disapprove of my choices or actions.",
    category: "FAMILY",
    context: "primary_caregiver",
    dimension: "anxiety",
    weight: 1.3,
  },

  // SECONDARY CAREGIVER RELATIONSHIP QUESTIONS (Weight: 1.3)
  {
    id: 11,
    text: "My secondary caregiver was reliable in providing comfort when I needed it.",
    category: "FAMILY",
    context: "secondary_caregiver",
    dimension: "avoidance",
    weight: 1.3,
    // This is reverse-scored in the calculation
  },
  {
    id: 12,
    text: "I often feel the need to be self-reliant because my secondary caregiver was distant.",
    category: "FAMILY",
    context: "secondary_caregiver",
    dimension: "avoidance",
    weight: 1.3,
  },
  {
    id: 13,
    text: "I worry about disappointing my secondary caregiver or losing their approval.",
    category: "FAMILY",
    context: "secondary_caregiver",
    dimension: "anxiety",
    weight: 1.3,
  },
  {
    id: 14,
    text: "I find it difficult to share personal struggles with my secondary caregiver.",
    category: "FAMILY",
    context: "secondary_caregiver",
    dimension: "avoidance",
    weight: 1.3,
  },

  // FRIENDSHIP/GENERAL RELATIONSHIP QUESTIONS (Weight: 1.0)
  {
    id: 15,
    text: "I'm afraid my close friends might reject me if they truly know me.",
    category: "FRIENDSHIP",
    context: "friends",
    dimension: "anxiety",
    weight: 1.0,
  },
  {
    id: 16,
    text: "I rarely share my real feelings with friends, even those I trust.",
    category: "FRIENDSHIP",
    context: "friends",
    dimension: "avoidance",
    weight: 1.0,
  },
  {
    id: 17,
    text: "I usually trust that my friends have my best interests at heart.",
    category: "FRIENDSHIP",
    context: "friends",
    dimension: "anxiety",
    weight: 1.0,
    // This is reverse-scored in the calculation
  },
  {
    id: 18,
    text: "I'm comfortable depending on friends when I need help.",
    category: "FRIENDSHIP",
    context: "friends",
    dimension: "avoidance",
    weight: 1.0,
    // This is reverse-scored in the calculation
  },

  // GENERAL ATTACHMENT QUESTIONS (Weight: 1.0)
  {
    id: 19,
    text: "I worry a lot about my relationships suddenly ending.",
    category: "GENERAL",
    context: "general",
    dimension: "anxiety",
    weight: 1.0,
  },
  {
    id: 20,
    text: "I usually keep an emotional distance in most of my relationships.",
    category: "GENERAL",
    context: "general",
    dimension: "avoidance",
    weight: 1.0,
  },
  {
    id: 21,
    text: "I find it easy to trust others with my deepest thoughts and feelings.",
    category: "GENERAL",
    context: "general",
    dimension: "avoidance",
    weight: 1.0,
    // This is reverse-scored in the calculation
  },
  {
    id: 22,
    text: "I generally feel confident that others will support me when I need help.",
    category: "GENERAL",
    context: "general",
    dimension: "anxiety",
    weight: 1.0,
    // This is reverse-scored in the calculation
  },

  // VALIDITY / ATTENTION CHECK QUESTIONS
  {
    id: 23,
    text: "For this question, please select 'SOMEWHAT AGREE' to show you're paying attention.",
    category: "ATTENTION CHECK",
    context: "general",
    dimension: "validity",
    weight: 0,
    isValidity: true,
  },
  {
    id: 24,
    text: "I never feel any stress, anxiety, or frustration in my relationships.",
    category: "CONSISTENCY CHECK",
    context: "general",
    dimension: "validity",
    weight: 0,
    isValidity: true,
  },
]

// Items that need to be reverse-scored (convert 1-7 to 7-1)
export const reverseScoreItems = [7, 9, 11, 17, 18, 21, 22]

// Context weights for calculating composite scores
export const contextWeights = {
  partner: 1.5,
  primary_caregiver: 1.3,
  secondary_caregiver: 1.3,
  friends: 1.0,
  general: 1.0,
}
