"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CaregiverInterstitialProps {
  onContinue: () => void
}

export function CaregiverInterstitial({ onContinue }: CaregiverInterstitialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="mb-8 border-deep-blue bg-black/80 shadow-lg shadow-cyan-400/5">
        <div className="relative overflow-hidden rounded-lg border-t border-blue-500/20 p-6">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl"></div>

          <h3 className="mb-6 font-heading text-xl font-normal tracking-wider text-white">
            ABOUT THE CAREGIVER QUESTIONS
          </h3>

          <div className="mb-8 space-y-4 text-white/90">
            <p className="font-sans text-base leading-relaxed">
              In the following section, we'll ask about the caregivers or parental figures you had growing up. Please
              read this information carefully before proceeding.
            </p>

            <div className="rounded-sm border border-blue-500/20 bg-deep-blue/20 p-4">
              <h4 className="mb-2 font-sans text-base font-medium">Primary & Secondary Caregivers</h4>
              <p className="text-sm leading-relaxed mb-3">
                Your <strong>primary caregiver</strong> is the person who was most responsible for your care and with
                whom you spent the most time during your formative years. This is often a mother, but could be a father,
                grandparent, or another guardian.
              </p>
              <p className="text-sm leading-relaxed mb-3">
                Your <strong>secondary caregiver</strong> is another important adult who was consistently involved in
                your upbringing. This could be your other parent, a step-parent, grandparent, older sibling, or another
                significant adult figure.
              </p>
              <p className="text-sm leading-relaxed">
                <strong>Example:</strong> In a traditional two-parent household, if your mother was your main caretaker,
                she would be your primary caregiver, and your father would be your secondary caregiver. However, family
                structures vary widely, and your caregivers might have been different people in your life.
              </p>
            </div>

            <div className="rounded-sm border border-blue-500/20 bg-deep-blue/20 p-4">
              <h4 className="mb-2 font-sans text-base font-medium">How to Answer</h4>
              <p className="text-sm leading-relaxed mb-3">
                If you only had one significant caregiver growing up, you can select "Not Applicable" for the secondary
                caregiver questions.
              </p>
              <p className="text-sm leading-relaxed">
                If your relationship with a caregiver changed significantly over time, answer based on what you feel
                most strongly shaped your attachment patterns during your formative years.
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm leading-relaxed text-white/80">
                Understanding your early relationships with caregivers provides valuable insights into your current
                relationship patterns and can help you develop more secure connections.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={onContinue}
              className="relative overflow-hidden border border-blue-500/50 bg-deep-blue/40 font-sans text-white hover:bg-deep-blue/60"
            >
              I UNDERSTAND
              <span className="ml-2 text-xs">▶</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
