"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAttachmentDescription } from "@/lib/attachment-descriptions"
import { motion } from "framer-motion"
import { RefreshCw, Download } from "lucide-react"
import { RelationshipRadarChart } from "@/components/relationship-radar-chart"
import { generatePDF } from "@/lib/generate-pdf"
import { toast } from "@/components/ui/use-toast"

interface ResultsProps {
  results: {
    compositeAnxietyScore: number
    compositeAvoidanceScore: number
    contextScores: Record<string, { anxiety: number; avoidance: number }>
    validityScore: number
    consistencyScore: number
    attachmentStyle: string
    subtype: string
    reliabilityLevel: string
  }
  answers: Record<number, number>
}

export function QuizResults({ results, answers }: ResultsProps) {
  const {
    compositeAnxietyScore,
    compositeAvoidanceScore,
    contextScores,
    validityScore,
    attachmentStyle,
    subtype,
    reliabilityLevel,
  } = results

  const [activeTab, setActiveTab] = useState("overview")
  const [showResults, setShowResults] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setShowResults(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const description = getAttachmentDescription(attachmentStyle)

  const refreshPage = () => {
    window.location.reload()
  }

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)

      // Call the PDF generation function
      const success = await generatePDF({
        answers,
        results,
      })

      if (success) {
        toast({
          title: "PDF Generated Successfully",
          description: "Your assessment results have been saved as a PDF.",
          duration: 5000,
        })
      } else {
        toast({
          title: "PDF Generation Failed",
          description: "There was an error creating your PDF. Please try again.",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      console.error("Error in PDF generation:", error)
      toast({
        title: "PDF Generation Failed",
        description: "There was an error creating your PDF. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  // Get context-specific insights
  const getContextInsight = (context: string) => {
    const scores = contextScores[context]
    if (!scores) return "No data available for this relationship context."

    if (context === "partner") {
      if (scores.anxiety > 4 && scores.avoidance > 4) {
        return "You show disorganized (fearful) tendencies in romantic relationships, desiring closeness but feeling uncomfortable with too much intimacy."
      } else if (scores.anxiety > 4) {
        return "You value intimacy in romantic relationships but sometimes worry about your partner's commitment or availability, showing anxious (preoccupied) tendencies."
      } else if (scores.avoidance > 4) {
        return "You tend to maintain emotional distance in romantic relationships, valuing independence over deep connection, showing avoidant (dismissive) tendencies."
      } else {
        return "You generally feel secure in romantic relationships, balancing closeness with healthy independence."
      }
    } else if (context === "primary_caregiver") {
      if (scores.anxiety > 4 && scores.avoidance > 4) {
        return "Your relationship with your primary caregiver shows conflicting patterns of wanting connection while maintaining distance."
      } else if (scores.anxiety > 4) {
        return "You may worry about approval or emotional availability in your relationship with your primary caregiver."
      } else if (scores.avoidance > 4) {
        return "You tend to maintain emotional distance in your relationship with your primary caregiver."
      } else {
        return "You show a relatively secure pattern in your relationship with your primary caregiver."
      }
    } else if (context === "secondary_caregiver") {
      if (scores.anxiety > 4 && scores.avoidance > 4) {
        return "Your relationship with your secondary caregiver shows conflicting patterns of wanting connection while maintaining distance."
      } else if (scores.anxiety > 4) {
        return "You may worry about approval or emotional availability in your relationship with your secondary caregiver."
      } else if (scores.avoidance > 4) {
        return "You tend to maintain emotional distance in your relationship with your secondary caregiver."
      } else {
        return "You show a relatively secure pattern in your relationship with your secondary caregiver."
      }
    } else if (context === "friends") {
      if (scores.anxiety > 4 && scores.avoidance > 4) {
        return "In friendships, you may desire closeness but feel uncomfortable with too much vulnerability, showing disorganized tendencies."
      } else if (scores.anxiety > 4) {
        return "You value close friendships but may worry about rejection or abandonment, showing anxious tendencies."
      } else if (scores.avoidance > 4) {
        return "You tend to keep emotional distance in friendships, perhaps sharing less of your personal life, showing avoidant tendencies."
      } else {
        return "You generally feel secure in friendships, able to be authentic while respecting boundaries."
      }
    } else {
      if (scores.anxiety > 4 && scores.avoidance > 4) {
        return "In general relationships, you show a pattern of both wanting connection and keeping distance, characteristic of a disorganized (fearful) style."
      } else if (scores.anxiety > 4) {
        return "You generally tend to worry about how others perceive you across different relationships, characteristic of an anxious (preoccupied) style."
      } else if (scores.avoidance > 4) {
        return "You generally prefer to maintain emotional distance across different relationships, characteristic of an avoidant (dismissive) style."
      } else {
        return "You show a generally secure pattern across different types of relationships."
      }
    }
  }

  if (!showResults) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center">
        <div className="relative mb-8 h-32 w-32">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full animate-pulse rounded-full border border-cyan-400/30 p-4"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 animate-pulse rounded-full border border-cyan-400/20 p-4"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-cyan-400/60 p-4"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-pulse rounded-full bg-cyan-400/20"></div>
          </div>
        </div>
        <p className="mb-2 font-sans text-lg font-medium tracking-normal text-white">ANALYZING YOUR RESPONSES</p>
        <p className="font-sans text-sm text-white/80">Calculating your attachment style...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="mx-auto max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="mb-8 overflow-hidden border-deep-blue bg-black/80 shadow-lg shadow-blue-500/10">
        <div className="relative border-b border-blue-500/20 bg-gradient-to-b from-deep-blue/40 to-black/40 px-6 py-8 text-center">
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-heading mb-2 text-2xl font-normal tracking-wider text-white md:text-3xl">
              YOUR ATTACHMENT STYLE RESULTS
            </h2>
            <div className="mx-auto mb-4 h-px w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <p className="font-sans text-sm text-white/80">
              Understanding your attachment style can help you build healthier relationships
            </p>
          </motion.div>
        </div>

        <div className="p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative mx-auto mb-6 inline-block">
              <div className="relative z-10 rounded-sm border border-blue-500/30 bg-deep-blue/20 px-8 py-4">
                <h3 className="font-heading text-xl font-normal tracking-wider text-white md:text-2xl">
                  {attachmentStyle}
                </h3>
                <p className="font-sans text-sm tracking-normal text-blue-500">{subtype}</p>
              </div>
              <div className="absolute -bottom-2 -right-2 h-full w-full rounded-sm border border-blue-500/10 bg-deep-blue/10"></div>
            </div>

            {/* Attachment Grid moved to the top */}
            <div className="mx-auto mb-6 max-w-md">
              <div className="relative overflow-hidden rounded-sm border border-deep-blue bg-black/40 p-4">
                <h4 className="mb-3 font-heading text-lg font-normal tracking-wider text-white text-center">
                  ATTACHMENT GRID
                </h4>
                <div className="relative mx-auto h-64 w-full overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-deep-blue"></div>
                  <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-deep-blue"></div>

                  {/* Labels */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 rotate-90 font-sans text-sm font-medium text-white/80">
                    AVOIDANCE
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 font-sans text-sm font-medium text-white/80">
                    ANXIETY
                  </div>

                  {/* Quadrant labels */}
                  <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 font-sans text-xs font-medium text-white/80">
                    SECURE
                  </div>
                  <div className="absolute left-3/4 top-1/4 -translate-x-1/2 -translate-y-1/2 font-sans text-xs font-medium text-white/80">
                    ANXIOUS (PREOCCUPIED)
                  </div>
                  <div className="absolute left-1/4 top-3/4 -translate-x-1/2 -translate-y-1/2 font-sans text-xs font-medium text-white/80">
                    AVOIDANT (DISMISSIVE)
                  </div>
                  <div className="absolute left-3/4 top-3/4 -translate-x-1/2 -translate-y-1/2 font-sans text-xs font-medium text-white/80">
                    DISORGANIZED (FEARFUL)
                  </div>

                  {/* User's position dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(0,123,255,0.6)]"
                    style={{
                      left: `${(compositeAnxietyScore / 7) * 100}%`,
                      top: `${(compositeAvoidanceScore / 7) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  ></motion.div>
                </div>
                <p className="mt-2 font-sans text-xs text-white/80 text-center">
                  This grid shows anxiety (horizontal) and avoidance (vertical) dimensions of attachment.
                </p>
              </div>
            </div>

            {/* Scores moved below the grid */}
            <div className="flex flex-col md:flex-row justify-center gap-4 text-sm">
              <div className="rounded-sm border border-deep-blue bg-black/40 px-6 py-3 flex-1 max-w-xs mx-auto">
                <div className="text-center">
                  <span className="font-sans font-medium tracking-normal text-white/80">ANXIETY SCORE:</span>{" "}
                  <span className="font-sans font-bold text-blue-500 text-xl">{compositeAnxietyScore.toFixed(1)}</span>
                </div>
                <p className="mt-2 font-sans text-sm text-white/80 text-center">
                  {compositeAnxietyScore > 4
                    ? "You tend to worry about rejection and seek reassurance in relationships."
                    : "You generally feel secure about how others view you and worry less about rejection."}
                </p>
              </div>
              <div className="rounded-sm border border-deep-blue bg-black/40 px-6 py-3 flex-1 max-w-xs mx-auto">
                <div className="text-center">
                  <span className="font-sans font-medium tracking-normal text-white/80">AVOIDANCE SCORE:</span>{" "}
                  <span className="font-sans font-bold text-blue-500 text-xl">
                    {compositeAvoidanceScore.toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 font-sans text-sm text-white/80 text-center">
                  {compositeAvoidanceScore > 4
                    ? "You tend to maintain emotional distance and value independence in relationships."
                    : "You're generally comfortable with emotional closeness and interdependence."}
                </p>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-deep-blue/20">
              <TabsTrigger
                value="overview"
                className="font-heading text-xl py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-deep-blue/40 data-[state=active]:text-white"
              >
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger
                value="contexts"
                className="font-heading text-xl py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-deep-blue/40 data-[state=active]:text-white"
              >
                RELATIONSHIP CONTEXTS
              </TabsTrigger>
              <TabsTrigger
                value="growth"
                className="font-heading text-xl py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-deep-blue/40 data-[state=active]:text-white"
              >
                GROWTH STEPS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="mb-6">
                <div className="mb-8">
                  <h3 className="mb-6 font-heading text-xl font-normal tracking-wider text-white">
                    YOUR PRIMARY ATTACHMENT STYLE
                  </h3>
                  <p className="mb-4 font-sans text-base leading-relaxed text-white/90">
                    {attachmentStyle === "SECURE"
                      ? "You show a Secure attachment style, meaning you're generally comfortable with emotional closeness and trust in relationships. You also value your independence, which helps you balance your need for intimacy with personal space."
                      : attachmentStyle === "ANXIOUS" || attachmentStyle === "PREOCCUPIED"
                        ? "You show an Anxious (Preoccupied) attachment style, meaning you value close relationships highly but may sometimes worry about whether others value you as much as you value them. You seek closeness and reassurance in your relationships."
                        : attachmentStyle === "AVOIDANT" || attachmentStyle === "DISMISSING"
                          ? "You show an Avoidant (Dismissive) attachment style, meaning you highly value your independence and self-sufficiency. You may prefer to rely on yourself rather than others and might keep some emotional distance in relationships."
                          : "You show a Disorganized (Fearful) attachment style, meaning you desire close relationships but also feel uncomfortable with too much emotional intimacy. You may experience conflicting desires to be close to others while also wanting to protect yourself."}
                  </p>
                </div>

                <div className="rounded-sm border border-deep-blue bg-black/40 p-4">
                  <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">
                    WHAT THIS MEANS FOR YOU
                  </h4>
                  <p className="mb-4 font-sans text-base text-white/90">{description.summary}</p>

                  {/* Add behavioral indicators section */}
                  <div className="mb-4 rounded-sm border border-blue-500/20 bg-deep-blue/20 p-4">
                    <h5 className="mb-4 font-heading text-base font-normal tracking-wider text-white">
                      COMMON BEHAVIORS
                    </h5>
                    <ul className="space-y-2 font-sans text-sm text-white/90">
                      {description.behaviors.map((behavior, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-blue-500">•</span>
                          <span>{behavior}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-sm border border-deep-blue bg-black/40 p-3">
                      <h5 className="mb-4 font-heading text-base font-normal text-white">STRENGTHS</h5>
                      <ul className="space-y-1 font-sans text-sm text-white/80">
                        {attachmentStyle === "SECURE" ? (
                          <>
                            <li>• Comfortable with emotional intimacy</li>
                            <li>• Good at communicating needs</li>
                            <li>• Balance independence and connection</li>
                            <li>• Recover well from relationship conflicts</li>
                          </>
                        ) : attachmentStyle === "ANXIOUS" || attachmentStyle === "PREOCCUPIED" ? (
                          <>
                            <li>• Deeply committed to relationships</li>
                            <li>• Emotionally expressive and open</li>
                            <li>• Sensitive to others' needs</li>
                            <li>• Willing to work on relationships</li>
                          </>
                        ) : attachmentStyle === "AVOIDANT" || attachmentStyle === "DISMISSING" ? (
                          <>
                            <li>• Strong sense of self-reliance</li>
                            <li>• Comfortable with independence</li>
                            <li>• Logical approach to problems</li>
                            <li>• Clear personal boundaries</li>
                          </>
                        ) : (
                          <>
                            <li>• Highly perceptive of relationship dynamics</li>
                            <li>• Capacity for deep emotional connection</li>
                            <li>• Self-protective when necessary</li>
                            <li>• Adaptable in different situations</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="rounded-sm border border-deep-blue bg-black/40 p-3">
                      <h5 className="mb-4 font-heading text-base font-normal text-white">CHALLENGES</h5>
                      <ul className="space-y-1 font-sans text-sm text-white/80">
                        {attachmentStyle === "SECURE" ? (
                          <>
                            <li>• May struggle with highly anxious partners</li>
                            <li>• Could become complacent in relationships</li>
                            <li>• Might not always recognize others' insecurities</li>
                            <li>• Can be thrown off by unpredictable behavior</li>
                          </>
                        ) : attachmentStyle === "ANXIOUS" || attachmentStyle === "PREOCCUPIED" ? (
                          <>
                            <li>• May worry excessively about rejection</li>
                            <li>• Can become overly dependent on reassurance</li>
                            <li>• Might misinterpret neutral signals as negative</li>
                            <li>• May struggle with setting boundaries</li>
                          </>
                        ) : attachmentStyle === "AVOIDANT" || attachmentStyle === "DISMISSING" ? (
                          <>
                            <li>• Difficulty opening up emotionally</li>
                            <li>• May dismiss the importance of feelings</li>
                            <li>• Can seem distant or unavailable to others</li>
                            <li>• Might avoid seeking help when needed</li>
                          </>
                        ) : (
                          <>
                            <li>• Conflicting desires for closeness and distance</li>
                            <li>• Difficulty trusting others consistently</li>
                            <li>• May withdraw when feeling vulnerable</li>
                            <li>• Emotional regulation challenges during conflicts</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contexts" className="mt-8">
              <div className="mb-6">
                <h3 className="mb-6 font-heading text-xl font-normal tracking-wider text-white">
                  RELATIONSHIP-SPECIFIC PATTERNS
                </h3>
                <p className="mb-4 font-sans text-base leading-relaxed text-white/90">
                  Your attachment style can vary across different relationships. This analysis shows how your attachment
                  patterns differ between romantic relationships, family connections, and friendships.
                </p>

                <div className="mb-6 rounded-sm border border-deep-blue bg-black/40 p-4">
                  <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">
                    ATTACHMENT ACROSS RELATIONSHIPS
                  </h4>
                  <div className="mb-4">
                    <RelationshipRadarChart contextScores={contextScores} />
                  </div>
                  <p className="mt-4 font-sans text-sm text-white/90">
                    This chart shows how your anxiety (red) and avoidance (blue) levels vary across different
                    relationship contexts. Points closer to the center indicate more secure attachment in that area.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-sm border border-deep-blue bg-black/40 p-4">
                    <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">
                      ROMANTIC RELATIONSHIPS
                    </h4>
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-[#FF6B6B]"></div>
                      <span className="font-sans text-sm text-white/80">
                        Anxiety: {contextScores.partner?.anxiety.toFixed(1)}
                      </span>
                      <div className="mx-2 h-3 w-3 rounded-full bg-[#007BFF]"></div>
                      <span className="font-sans text-sm text-white/80">
                        Avoidance: {contextScores.partner?.avoidance.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-white/80">{getContextInsight("partner")}</p>
                  </div>

                  <div className="rounded-sm border border-deep-blue bg-black/40 p-4">
                    <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">
                      PRIMARY CAREGIVER RELATIONSHIP
                    </h4>
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-[#FF6B6B]"></div>
                      <span className="font-sans text-sm text-white/80">
                        Anxiety: {contextScores.primary_caregiver?.anxiety.toFixed(1)}
                      </span>
                      <div className="mx-2 h-3 w-3 rounded-full bg-[#007BFF]"></div>
                      <span className="font-sans text-sm text-white/80">
                        Avoidance: {contextScores.primary_caregiver?.avoidance.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-white/80">{getContextInsight("primary_caregiver")}</p>
                  </div>

                  <div className="rounded-sm border border-deep-blue bg-black/40 p-4">
                    <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">
                      SECONDARY CAREGIVER RELATIONSHIP
                    </h4>
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-[#FF6B6B]"></div>
                      <span className="font-sans text-sm text-white/80">
                        Anxiety: {contextScores.secondary_caregiver?.anxiety.toFixed(1)}
                      </span>
                      <div className="mx-2 h-3 w-3 rounded-full bg-[#007BFF]"></div>
                      <span className="font-sans text-sm text-white/80">
                        Avoidance: {contextScores.secondary_caregiver?.avoidance.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-white/80">{getContextInsight("secondary_caregiver")}</p>
                  </div>

                  <div className="rounded-sm border border-deep-blue bg-black/40 p-4">
                    <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">FRIENDSHIPS</h4>
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-[#FF6B6B]"></div>
                      <span className="font-sans text-sm text-white/80">
                        Anxiety: {contextScores.friends?.anxiety.toFixed(1)}
                      </span>
                      <div className="mx-2 h-3 w-3 rounded-full bg-[#007BFF]"></div>
                      <span className="font-sans text-sm text-white/80">
                        Avoidance: {contextScores.friends?.avoidance.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-white/80">{getContextInsight("friends")}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-sm border border-deep-blue bg-black/40 p-4">
                  <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">WHAT THIS MEANS</h4>
                  <p className="font-sans text-sm text-white/80">
                    Variations in your attachment patterns across relationships are normal and can provide valuable
                    insights. Early experiences with caregivers often shape how we relate to others, but each
                    relationship also has its own unique dynamics. Understanding these patterns can help you develop
                    more secure connections in all areas of your life.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="growth" className="mt-8">
              <div className="mb-6">
                <h3 className="mb-6 font-heading text-xl font-normal tracking-wider text-white">GROWTH STEPS</h3>
                <p className="mb-4 font-sans text-sm leading-relaxed text-white/80">
                  Understanding your attachment style is the first step toward developing healthier relationship
                  patterns. Here are practical steps you can take:
                </p>

                <div className="mb-6 space-y-4">
                  {description.growthTips.map((tip, index) => (
                    <div key={index} className="rounded-sm border border-deep-blue bg-black/40 p-4">
                      <div className="mb-2 flex items-center">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-sm border border-blue-500/30 bg-deep-blue/20 text-xs text-blue-500">
                          {index + 1}
                        </div>
                        <h4 className="font-heading text-lg font-normal tracking-wider text-white">{tip.title}</h4>
                      </div>
                      <p className="font-sans text-sm text-white/80">{tip.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-sm border border-deep-blue bg-black/40 p-4">
                  <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">
                    PRACTICAL EXERCISES
                  </h4>
                  <ul className="space-y-2 font-sans text-sm text-white/80">
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-500">→</span>
                      <span>
                        <strong>Reflection Journal:</strong> Set aside 10 minutes daily to write about your relationship
                        patterns. Notice when you feel anxious or avoidant and what triggers these responses.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-500">→</span>
                      <span>
                        <strong>Communication Practice:</strong> Choose one relationship to practice more open
                        communication. Start with small disclosures and gradually work toward sharing more significant
                        feelings.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-500">→</span>
                      <span>
                        <strong>Mindfulness Technique:</strong> When you notice attachment-related anxiety or avoidance,
                        practice a 5-minute breathing exercise to center yourself before responding.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-500">→</span>
                      <span>
                        <strong>Boundary Setting:</strong> Identify one relationship where you need clearer boundaries
                        and practice expressing your needs directly but kindly.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-sm border border-blue-500/20 bg-deep-blue/20 p-4">
                  <h4 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">
                    IMPORTANT REMINDER
                  </h4>
                  <p className="font-sans text-sm text-white/80">
                    Attachment styles can change over time with self-awareness and intentional effort. This assessment
                    provides a starting point, not a permanent label. With consistent practice and sometimes
                    professional support, you can develop more secure attachment patterns.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="rounded-sm border border-deep-blue bg-black/40 p-4">
            <h3 className="mb-4 font-heading text-lg font-normal tracking-wider text-white">
              ASSESSMENT RELIABILITY: {reliabilityLevel}
            </h3>
            <p className="font-sans text-sm text-white/80">
              {validityScore < 90
                ? "We detected some inconsistencies in your responses. For more accurate insights, consider taking the assessment again when you can give it your full attention."
                : "Your responses were consistent and thoughtful, giving us confidence that these results accurately reflect your relationship patterns."}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          onClick={refreshPage}
          variant="outline"
          className="flex items-center justify-center gap-2 border-deep-blue bg-transparent font-sans text-white/80 hover:border-white hover:bg-white/5 hover:text-white"
        >
          <RefreshCw size={16} className="text-blue-500" />
          RETAKE ASSESSMENT
        </Button>

        <Button
          className="relative flex items-center justify-center gap-2 overflow-hidden border border-blue-500/50 bg-deep-blue/40 font-sans text-white hover:bg-deep-blue/60"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-2">GENERATING PDF...</span>
            </>
          ) : (
            <>
              <Download size={16} className="text-blue-500" />
              SAVE RESULTS
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
