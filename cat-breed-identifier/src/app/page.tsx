'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative paw prints */}
      <div className="absolute top-12 right-8 opacity-15 text-orange-300">
        <PawPrint size={32} />
      </div>
      <div className="absolute top-40 left-12 opacity-10 text-orange-300">
        <PawPrint size={24} />
      </div>
      <div className="absolute bottom-32 right-16 opacity-15 text-orange-300">
        <PawPrint size={40} />
      </div>
      <div className="absolute bottom-12 left-8 opacity-10 text-orange-300">
        <PawPrint size={28} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Main Hero Section with Cats */}
        <div className="relative mb-20">
          {/* Three Cat Faces - Looking Down */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12 items-start justify-items-center">
            {/* Left Cat - Black */}
            <div className="w-24 h-24 sm:w-32 sm:h-32">
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Head */}
                <circle cx="50" cy="45" r="30" fill="#1a1a1a" />
                {/* Ears */}
                <polygon points="30,20 20,0 35,15" fill="#1a1a1a" />
                <polygon points="70,20 80,0 65,15" fill="#1a1a1a" />
                {/* Eyes */}
                <circle cx="40" cy="40" r="4" fill="#90EE90" />
                <circle cx="60" cy="40" r="4" fill="#90EE90" />
                {/* Nose */}
                <polygon points="50,50 47,55 53,55" fill="#FF69B4" />
                {/* Mouth */}
                <path d="M 50 55 Q 45 60 40 58" stroke="#fff" strokeWidth="1.5" fill="none" />
                <path d="M 50 55 Q 55 60 60 58" stroke="#fff" strokeWidth="1.5" fill="none" />
                {/* Whiskers */}
                <line x1="20" y1="45" x2="5" y2="43" stroke="#fff" strokeWidth="1" />
                <line x1="20" y1="50" x2="5" y2="52" stroke="#fff" strokeWidth="1" />
                <line x1="80" y1="45" x2="95" y2="43" stroke="#fff" strokeWidth="1" />
                <line x1="80" y1="50" x2="95" y2="52" stroke="#fff" strokeWidth="1" />
              </svg>
            </div>

            {/* Center Cat - Ginger */}
            <div className="w-28 h-28 sm:w-40 sm:h-40">
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Head */}
                <circle cx="50" cy="45" r="32" fill="#FFA500" />
                {/* Ears */}
                <polygon points="28,18 15,0 32,12" fill="#FFA500" />
                <polygon points="72,18 85,0 68,12" fill="#FFA500" />
                {/* Eyes */}
                <circle cx="38" cy="38" r="5" fill="#FFD700" />
                <circle cx="62" cy="38" r="5" fill="#FFD700" />
                <circle cx="39" cy="39" r="2" fill="#000" />
                <circle cx="63" cy="39" r="2" fill="#000" />
                {/* Nose */}
                <polygon points="50,50 47,56 53,56" fill="#FF69B4" />
                {/* Mouth */}
                <path d="M 50 56 Q 45 62 38 59" stroke="#fff" strokeWidth="2" fill="none" />
                <path d="M 50 56 Q 55 62 62 59" stroke="#fff" strokeWidth="2" fill="none" />
                {/* Whiskers */}
                <line x1="18" y1="45" x2="2" y2="43" stroke="#FF8C00" strokeWidth="1.5" />
                <line x1="18" y1="52" x2="2" y2="55" stroke="#FF8C00" strokeWidth="1.5" />
                <line x1="82" y1="45" x2="98" y2="43" stroke="#FF8C00" strokeWidth="1.5" />
                <line x1="82" y1="52" x2="98" y2="55" stroke="#FF8C00" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Right Cat - Dark Brown */}
            <div className="w-24 h-24 sm:w-32 sm:h-32">
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Head */}
                <circle cx="50" cy="45" r="30" fill="#8B4513" />
                {/* Ears */}
                <polygon points="30,20 20,0 35,15" fill="#8B4513" />
                <polygon points="70,20 80,0 65,15" fill="#8B4513" />
                {/* Eyes */}
                <circle cx="40" cy="40" r="4" fill="#90EE90" />
                <circle cx="60" cy="40" r="4" fill="#90EE90" />
                {/* Nose */}
                <polygon points="50,50 47,55 53,55" fill="#FFB6C1" />
                {/* Mouth */}
                <path d="M 50 55 Q 45 60 40 58" stroke="#fff" strokeWidth="1.5" fill="none" />
                <path d="M 50 55 Q 55 60 60 58" stroke="#fff" strokeWidth="1.5" fill="none" />
                {/* Whiskers */}
                <line x1="20" y1="45" x2="5" y2="43" stroke="#fff" strokeWidth="1" />
                <line x1="20" y1="50" x2="5" y2="52" stroke="#fff" strokeWidth="1" />
                <line x1="80" y1="45" x2="95" y2="43" stroke="#fff" strokeWidth="1" />
                <line x1="80" y1="50" x2="95" y2="52" stroke="#fff" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              <span className="block text-neutral-900 mb-2">Discover Your</span>
              <span className="block text-orange-500" style={{fontFamily: 'Georgia, serif'}}>
                Cat's Breed
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto">
              Simply upload a photo or capture a picture of your cat, and discover fascinating facts about its breed
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-20">
            <Link
              href="/identifier"
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              Start Identifying
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>

        {/* What You'll Learn Section */}
        <div className="bg-neutral-50 rounded-3xl p-10 sm:p-16 mb-20 border border-neutral-200">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 text-center mb-12">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <LearnCard
              title="Average Age"
              description="Typical lifespan and life stages"
              icon="📅"
            />
            <LearnCard
              title="Weight & Size"
              description="Physical characteristics and dimensions"
              icon="⚖️"
            />
            <LearnCard
              title="Origin"
              description="Where your cat's breed comes from"
              icon="🌍"
            />
            <LearnCard
              title="Health Info"
              description="Common illnesses and care requirements"
              icon="🏥"
            />
            <LearnCard
              title="Fun Facts"
              description="Unique traits and interesting history"
              icon="✨"
            />
            <LearnCard
              title="Temperament"
              description="Personality and behavioral traits"
              icon="😸"
            />
            <LearnCard
              title="Care Tips"
              description="Grooming and daily care guidelines"
              icon="🧹"
            />
            <LearnCard
              title="Compatibility"
              description="Ideal living environments and families"
              icon="🏠"
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StepCard
              step={1}
              title="Upload or Capture"
              description="Choose a photo from your device or use your camera"
            />
            <StepCard
              step={2}
              title="AI Analysis"
              description="Our system identifies the breed instantly"
            />
            <StepCard
              step={3}
              title="Discover Facts"
              description="Get detailed breed information and insights"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function LearnCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-lg hover:border-orange-200 transition-all duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm">{description}</p>
    </div>
  )
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-md">
        {step}
      </div>
      <h3 className="font-bold text-neutral-900 mb-2 text-lg">{title}</h3>
      <p className="text-neutral-600 text-sm">{description}</p>
    </div>
  )
}

function PawPrint({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block"
    >
      <circle cx="12" cy="4" r="2" />
      <circle cx="6" cy="10" r="2" />
      <circle cx="18" cy="10" r="2" />
      <circle cx="4" cy="16" r="2" />
      <circle cx="20" cy="16" r="2" />
      <circle cx="12" cy="20" r="2.5" />
    </svg>
  )
}
