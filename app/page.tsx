import type { Metadata } from "next"
import CommunicationAssessment from "@/components/communication-assessment"

export const metadata: Metadata = {
  title: "Communication Assessment | Beyond Driven",
  description:
    "Take the Beyond Driven communication assessment to discover your strengths and areas for growth in relationship communication",
}

export default function Home() {
  return <CommunicationAssessment />
}
