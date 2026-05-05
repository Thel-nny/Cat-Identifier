'use client'

import Link from 'next/link'
import { useState } from 'react'
import { UploadSection } from '@/src/components/UploadSection'
import { BreedCard } from '@/src/components/BreedCard'
import { HistorySidebar } from '@/src/components/HistorySidebar'
import { BreedIdentification } from '@/src/lib/types'
import OopsNotACat from '@/src/components/NotACat'
import { identifyBreed } from '@/src/lib/api'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export default function IdentifierApp() {
  const [currentResult, setCurrentResult] = useState<any | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTimestamp, setSelectedTimestamp] = useState<string | undefined>()
  const [error, setError] = useState<string | null>(null)

  const handleImageSelected = async (imageData: string) => {
    setIsLoading(true)
    setError(null)
    setCurrentResult(null)
    try {
      const response = await identifyBreed(imageData)
      if (response.success && response.data) {
        setCurrentResult(response.data)
        setSelectedTimestamp(response.data.timestamp.toISOString())
        setHistory((prev) => [response.data!, ...prev])
        setError(null)
      } else {
        setError(response.error || 'Not a cat detected')
        setCurrentResult(null)
      }
    } catch (error) {
      console.error('Error identifying breed:', error)
      setError('An error occurred while identifying the breed')
      setCurrentResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const onErrorClear = () => {
    setError(null)
    setCurrentResult(null)
  }

  const handleSelectFromHistory = (breed: BreedIdentification) => {
    setCurrentResult(breed)
    setSelectedTimestamp(breed.timestamp)
    setError(null)
  }

  const handleClearHistory = () => {
    setHistory([])
    setCurrentResult(null)
    setSelectedTimestamp(undefined)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-cover bg-center bg-fixed relative">
      <Image src="/cat.jpg" alt="Background" fill className="object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">

        {/* Header */}
        <div className="mb-8 bg-white/50 backdrop-blur rounded-2xl p-6 sm:p-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold mb-4 transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#473c39] mb-2">
            Cat Breed Identifier
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
              <div className="bg-white/50 backdrop-blur rounded-2xl p-6 shadow-lg border border-amber-100">
                <UploadSection
                  onImageSelected={handleImageSelected}
                  isLoading={isLoading}
                />
              </div>
              {/* Sample images row */}
              <div className="mt-6 bg-white/50 backdrop-blur rounded-2xl px-5 py-4 shadow-lg border border-amber-100">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                  Try a sample — drag a photo onto the upload box
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {[
                    { file: 'Abyssinian.jpg',       label: 'Abyssinian' },
                    { file: 'AmericanShorthair.jpg', label: 'American Shorthair' },
                    { file: 'Birman.jpg',           label: 'Birman' },
                    { file: 'BritishShorthair.jpg', label: 'British Shorthair' },
                    { file: 'MaineCoon.jpg',        label: 'Maine Coon' },
                    { file: 'Persian.jpg',          label: 'Persian' },
                    { file: 'Ragdoll.jpg',          label: 'Ragdoll' },
                    { file: 'RussianBlue.jpg',      label: 'Russian Blue' },
                    { file: 'Siamese.jpg',          label: 'Siamese' },
                    { file: 'Sphynx.jpg',           label: 'Sphynx' },
                  ].map(({ file, label }) => (
                    <div
                      key={file}
                      className="flex-shrink-0 group cursor-grab active:cursor-grabbing w-24"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', `/sample-images/${file}`)
                        e.dataTransfer.effectAllowed = 'copy'
                      }}
                    >
                      <img
                        src={`/sample-images/${file}`}
                        alt={label}
                        className="w-24 h-20 object-cover rounded-xl border border-neutral-200 group-hover:border-orange-300 group-hover:scale-105 transition-all duration-150 pointer-events-none"
                      />
                      <p className="text-[10px] text-center text-neutral-500 mt-1 truncate">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center — Breed Card */}
          <div className="lg:col-span-6">

            {/* Empty state */}
            {!isLoading && !error && !currentResult && (
              <div className="bg-white/50 backdrop-blur rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center text-center text-neutral-400 min-h-[300px]">
                <div className="text-5xl mb-4">🐾</div>
                <p className="font-medium text-neutral-600 mb-1">No result yet</p>
                <p className="text-sm">Upload a cat photo to get started</p>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="bg-white/50 backdrop-blur rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center min-h-[300px]">
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

            {/* Breed result */}
            {!isLoading && !error && currentResult && (
              <BreedCard result={currentResult} />
            )}

            {/* Not a cat error */}
            {!isLoading && error && (
              <OopsNotACat
                imageUrl="/NotCat.jpg"
                onAction={onErrorClear}
              />
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