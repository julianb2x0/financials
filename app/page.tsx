import { AttachmentQuiz } from "@/components/attachment-quiz"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="relative overflow-hidden">
        {/* Mesh Grid Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="mesh-grid h-full w-full"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="font-heading mb-2 text-center tracking-wider text-3xl font-normal uppercase text-white md:text-4xl lg:text-5xl">
              ATTACHMENT INSIGHT ASSESSMENT
            </h1>
            <div className="mx-auto mb-2 h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <p className="mx-auto max-w-2xl text-center font-sans text-xs text-white/80 md:text-sm">
              DISCOVER YOUR RELATIONAL FRAMEWORK ACROSS DIFFERENT RELATIONSHIP CONTEXTS
            </p>
          </div>
          <AttachmentQuiz />
        </div>
      </div>
    </main>
  )
}
