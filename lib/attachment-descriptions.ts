interface GrowthTip {
  title: string
  description: string
}

interface AttachmentDescription {
  summary: string
  detailedDescription: string
  dailyLife: string
  traits: string[]
  growthTips: GrowthTip[]
  behaviors: string[] // Added behaviors
}

type AttachmentDescriptions = {
  [key: string]: AttachmentDescription
}

export const attachmentDescriptions: AttachmentDescriptions = {
  SECURE: {
    summary:
      "You have a secure attachment style, characterized by comfort with both emotional intimacy and independence. You generally trust others, communicate openly, and maintain healthy boundaries in relationships.",
    detailedDescription:
      "People with secure attachment generally find it easy to form close, trusting relationships. You likely had consistent caregiving in childhood that helped you develop a sense that others can be relied upon, and that you are worthy of love and support.",
    dailyLife:
      "In everyday situations, you likely communicate your needs clearly and listen to others with genuine interest. For example, when facing a challenge at work, you're comfortable asking for help while also offering your own solutions. During conflicts with loved ones, you address issues directly rather than avoiding them or becoming overwhelmed.",
    traits: [
      "Comfortable with emotional intimacy",
      "Maintain a healthy balance between independence and connection",
      "Communicate your needs and feelings effectively",
      "Trust others and feel secure in your relationships",
      "Recover relatively quickly from relationship setbacks",
      "Have a positive view of yourself and others",
    ],
    behaviors: [
      "Openly discussing feelings without fear of rejection",
      "Setting and respecting boundaries in relationships",
      "Seeking support when needed while maintaining independence",
      "Resolving conflicts constructively without excessive anxiety",
      "Trusting partners without constant reassurance",
    ],
    growthTips: [
      {
        title: "ENHANCE SELF-AWARENESS",
        description:
          "Continue developing your emotional intelligence by reflecting on your reactions in different relationship situations and how they affect others.",
      },
      {
        title: "SUPPORT OTHERS",
        description:
          "Your secure attachment makes you well-positioned to help others feel safe. Consider how you might support friends or partners with different attachment styles.",
      },
      {
        title: "MAINTAIN MINDFULNESS",
        description:
          "Even secure individuals can experience relationship challenges. Practice mindfulness to stay aware of your emotions and reactions, especially during stressful periods.",
      },
    ],
  },
  ANXIOUS: {
    summary:
      "You have an anxious (preoccupied) attachment style, characterized by a strong desire for closeness but with worry about whether others value the relationship as much as you do.",
    detailedDescription:
      "People with anxious attachment often crave emotional intimacy and reassurance from their relationships. This style typically develops when childhood caregiving was inconsistent, leading to uncertainty about whether your needs will be met by others.",
    dailyLife:
      "In daily interactions, you might find yourself checking your phone frequently for messages from loved ones or analyzing subtle changes in tone during conversations. For instance, if a partner says they need space, you might immediately worry they're losing interest rather than simply needing downtime.",
    traits: [
      "Seek high levels of intimacy and reassurance",
      "Worry about relationship stability",
      "Highly attuned to subtle changes in others' behavior",
      "Strong desire for emotional closeness",
      "May struggle with setting boundaries",
      "Sensitive to rejection or abandonment",
    ],
    behaviors: [
      "Seeking frequent reassurance about your partner's feelings",
      "Becoming anxious when messages aren't answered quickly",
      "Worrying that minor disagreements might threaten the relationship",
      "Difficulty being alone or independent for extended periods",
      "Tendency to over-analyze interactions for signs of rejection",
    ],
    growthTips: [
      {
        title: "DEVELOP SELF-VALIDATION",
        description:
          "Work on developing internal sources of reassurance rather than always seeking it from others. Try journaling about your positive qualities and achievements.",
      },
      {
        title: "PRACTICE MINDFUL PAUSING",
        description:
          "When you feel anxious about a relationship, take a moment to breathe before reacting. Ask yourself if your concerns are based on current evidence or past fears.",
      },
      {
        title: "BUILD INDEPENDENCE",
        description:
          "Gradually increase your comfort with alone time and personal pursuits. This helps create a more balanced approach to relationships.",
      },
    ],
  },
  AVOIDANT: {
    summary:
      "You have an avoidant (dismissing) attachment style, characterized by a high value on independence and self-sufficiency, often at the expense of emotional intimacy.",
    detailedDescription:
      "People with avoidant attachment typically prefer self-reliance over emotional closeness. This style often develops when childhood caregivers were emotionally unavailable or discouraged expressions of need or vulnerability.",
    dailyLife:
      "In everyday situations, you likely value your independence and may keep conversations on a surface level. For example, when facing a personal challenge, your first instinct is to handle it yourself rather than reaching out. If someone shares deeply emotional content with you, you might feel uncomfortable or change the subject.",
    traits: [
      "Value independence and self-sufficiency",
      "Prefer not to depend on others",
      "Keep emotions private",
      "Maintain emotional distance in relationships",
      "Focus on logic over emotion",
      "Strong boundaries and self-reliance",
    ],
    behaviors: [
      "Preferring to solve problems independently rather than asking for help",
      "Feeling uncomfortable with displays of strong emotion",
      "Needing significant personal space and time alone",
      "Difficulty discussing feelings or personal vulnerabilities",
      "Tendency to intellectualize rather than express emotions",
    ],
    growthTips: [
      {
        title: "EXPAND EMOTIONAL AWARENESS",
        description:
          "Practice identifying and naming your emotions. Consider keeping an emotion journal to track patterns in how you feel.",
      },
      {
        title: "PRACTICE VULNERABILITY",
        description:
          "Challenge yourself to share one small personal thought or feeling with someone you trust each week.",
      },
      {
        title: "RECOGNIZE DISTANCING PATTERNS",
        description:
          "Notice when you're pulling away in relationships and pause to consider whether this is a habitual response or truly necessary in the moment.",
      },
    ],
  },
  DISORGANIZED: {
    summary:
      "You have a disorganized (fearful) attachment style, characterized by a desire for close relationships but difficulty trusting and depending on others, creating a push-pull dynamic.",
    detailedDescription:
      "People with disorganized attachment often experience conflicting desires for closeness and distance. This style typically develops from unpredictable or frightening experiences with caregivers, creating both a longing for and fear of close relationships.",
    dailyLife:
      "In daily interactions, you might experience conflicting desires—wanting closeness but feeling anxious when you get it. For instance, you might initiate plans with someone you care about, then feel overwhelmed and cancel when the moment arrives. During conflicts, you may struggle to express your needs clearly because you both want connection and fear rejection.",
    traits: [
      "Desire close relationships but feel uncomfortable with emotional intimacy",
      "Worry about being hurt if you allow yourself to become too close to others",
      "Have conflicting feelings about relationships",
      "Experience both anxiety and avoidance",
      "Difficulty trusting partners consistently",
      "Struggle with emotional regulation during conflicts",
    ],
    behaviors: [
      "Alternating between seeking closeness and pushing people away",
      "Feeling overwhelmed by strong emotions in relationships",
      "Difficulty trusting others even when they've proven reliable",
      "Experiencing intense reactions to perceived rejection",
      "Struggling with consistent communication patterns",
    ],
    growthTips: [
      {
        title: "DEVELOP CONSISTENCY",
        description:
          "Focus on building trust gradually with a few reliable people rather than seeking many intense connections.",
      },
      {
        title: "PRACTICE SELF-COMPASSION",
        description:
          "Work on being kind to yourself when you experience relationship difficulties, recognizing that your attachment style developed as a way to protect yourself.",
      },
      {
        title: "CONSIDER PROFESSIONAL SUPPORT",
        description:
          "This complex attachment style often benefits from therapy, where you can explore your patterns and develop new ways of relating in a safe environment.",
      },
    ],
  },
}

export function getAttachmentDescription(style: string): AttachmentDescription {
  // Map old style names to new ones
  const styleMap = {
    SECURE: "SECURE",
    PREOCCUPIED: "ANXIOUS",
    DISMISSING: "AVOIDANT",
    FEARFUL: "DISORGANIZED",
  }

  const mappedStyle = styleMap[style] || style

  return (
    attachmentDescriptions[mappedStyle] || {
      summary:
        "Your attachment style combines elements of different patterns. This mixed profile suggests your relationship approach may vary depending on context and partners.",
      detailedDescription:
        "A mixed attachment profile often indicates that you've had varied relationship experiences that have shaped how you connect with others. You may show different attachment behaviors in different relationships or contexts.",
      dailyLife:
        "In everyday life, you might find that your approach to relationships varies depending on the specific person or situation. You may be more secure in some relationships and show more anxious or avoidant tendencies in others.",
      traits: [
        "Show different attachment behaviors in different relationships",
        "Adapt your relationship approach based on circumstances",
        "Experience a mix of attachment-related emotions",
        "Have developed unique coping strategies for relationships",
        "May benefit from exploring which aspects of each style resonate most with you",
      ],
      behaviors: [
        "Showing secure behaviors in some relationships but anxious or avoidant in others",
        "Adapting your attachment style based on how others treat you",
        "Having different comfort levels with intimacy depending on the relationship",
        "Experiencing varying degrees of trust across different relationships",
        "Showing flexibility in how you approach different relationship contexts",
      ],
      growthTips: [
        {
          title: "IDENTIFY PATTERNS",
          description:
            "Notice which relationships activate different attachment responses to identify contextual triggers.",
        },
        {
          title: "BUILD ON SECURE MOMENTS",
          description:
            "Pay attention to times when you feel more secure in relationships and try to understand what contributes to this feeling.",
        },
        {
          title: "DEVELOP FLEXIBLE STRATEGIES",
          description:
            "Create a toolkit of approaches for different relationship situations, drawing on the strengths of each attachment style.",
        },
      ],
    }
  )
}
