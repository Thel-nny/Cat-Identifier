'use client'

import Link from 'next/link'
import { useState } from 'react'
import { UploadSection } from '@/src/components/UploadSection'
import { BreedCard } from '@/src/components/BreedCard'
import { HistorySidebar } from '@/src/components/HistorySidebar'
import { BreedIdentification } from '@/src/lib/types'
import { identifyBreed } from '@/src/lib/api'
import { ArrowLeft } from 'lucide-react'

export default function IdentifierApp() {
  const [currentResult, setCurrentResult] = useState<BreedIdentification | null>(null)
  const [history, setHistory] = useState<BreedIdentification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTimestamp, setSelectedTimestamp] = useState<string | undefined>()

  const handleImageSelected = async (imageData: string) => {
    setIsLoading(true)
    try {
      const response = await identifyBreed(imageData)
      if (response.success && response.data) {
        setCurrentResult(response.data)
        setSelectedTimestamp(response.data.timestamp)
        setHistory((prev) => [response.data!, ...prev])
      } else {
        alert(`Error: ${response.error || 'Failed to identify breed'}`)
      }
    } catch (error) {
      console.error('Error identifying breed:', error)
      alert('An error occurred while identifying the breed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectFromHistory = (breed: BreedIdentification) => {
    setCurrentResult(breed)
    setSelectedTimestamp(breed.timestamp)
  }

  const handleClearHistory = () => {
    setHistory([])
    setCurrentResult(null)
    setSelectedTimestamp(undefined)
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundColor: '#E8D7C3' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">

        {/* Header */}
        <div className="mb-8 bg-white/80 backdrop-blur rounded-2xl p-6 sm:p-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold mb-4 transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-2">
            🐱 Cat Breed Identifier
          </h1>
          <p className="text-neutral-600">
            Upload a photo of a cat to discover its breed and learn fascinating facts.
          </p>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left — Upload */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg border border-amber-100">
                <UploadSection
                  onImageSelected={handleImageSelected}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Center — Breed Card */}
          <div className="lg:col-span-6">
            {!currentResult && !isLoading && (
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center text-center text-neutral-400 min-h-[300px]">
                <div className="text-5xl mb-4">🐾</div>
                <p className="font-medium text-neutral-600 mb-1">No result yet</p>
                <p className="text-sm">Upload a cat photo to get started</p>
              </div>
            )}

            {isLoading && (
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center min-h-[300px]">
                <div className="flex gap-1.5 mb-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-orange-400"
                      style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-500">Analysing breed…</p>
                <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}`}</style>
              </div>
            )}

            {currentResult && !isLoading && (
              <BreedCard result={currentResult} />
            )}
          </div>

          {/* Right — History Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <HistorySidebar
                history={history}
                onSelectBreed={handleSelectFromHistory}
                onClearHistory={handleClearHistory}
                selectedId={selectedTimestamp}
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}