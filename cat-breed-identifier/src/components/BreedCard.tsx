'use client'

import { BreedIdentification } from '@/src/lib/types'
import { Key } from 'react'

interface BreedCardProps {
  result: BreedIdentification
}

export function BreedCard({ result }: BreedCardProps) {
  const { breedName: breed, confidence, isMixed, secondaryBreed, imageUrl, timestamp, details: info, allPredictions } = result as any

  const confColor =
    confidence >= 75 ? 'bg-green-500' :
    confidence >= 50 ? 'bg-amber-500' : 'bg-red-500'

  const illnesses = info?.healthIssues
    ? info.healthIssues.split(/,\s*/).filter(Boolean)
    : []

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Image */}
      <div className="w-full h-64 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
        <img
          src={imageUrl}
          alt={breed}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 space-y-6">

        {/* Name + Confidence bar */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-3xl font-bold text-[#0c0a09]">{breed}</h2>
            {info?.origin && (
              <span className="text-xs text-[#0c0a09] mt-2 flex-shrink-0">🌍 {info.origin}</span>
            )}
          </div>

          {isMixed && secondaryBreed && (
            <p className="text-sm text-amber-600">
              Mixed — secondary traits of <strong>{secondaryBreed}</strong>
            </p>
          )}

          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${confColor}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-sm font-semiboldtext-[#0c0a09] flex-shrink-0">
              {confidence.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Description */}
        {info?.description && (
          <p className="text-sm text-[#0c0a09] leading-relaxed">{info.description}</p>
        )}

        {/* Details grid */}
        {info && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-[#0c0a09] uppercase tracking-wider">Lifespan</p>
              <p className="text-base font-bold text-[#0c0a09] mt-1">{info.averageLifespan}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-[#0c0a09] uppercase tracking-wider">Weight</p>
              <p className="text-base font-bold text-[#0c0a09] mt-1">{info.averageWeight}</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4 col-span-2">
              <p className="text-xs font-semibold text-[#0c0a09] uppercase tracking-wider">Origin</p>
              <p className="text-base font-bold text-[#0c0a09] mt-1">{info.origin}</p>
            </div>
          </div>
        )}

        {/* Temperament */}
        {info?.temperament && (
          <div>
            <p className="text-xs font-semibold text-[#0c0a09] uppercase tracking-wider mb-2">Temperament</p>
            <div className="flex flex-wrap gap-2">
              {info.temperament.split(',').map((t: string) => (
                <span key={t} className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                  {t.trim()}
                </span>
              ))}
            </div>
            {info.temperamentDetail && (
              <p className="text-sm text-[#0c0a09] leading-relaxed mt-2">{info.temperamentDetail}</p>
            )}
          </div>
        )}

        {/* Fun fact */}
        {info?.funFact && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
            <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider">Fun Fact</p>
            <p className="text-sm text-[#0c0a09] mt-1 leading-relaxed">{info.funFact}</p>
          </div>
        )}

        {/* Health issues */}
        {illnesses.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[#0c0a09] uppercase tracking-wider mb-3">
              Common Health Issues
            </p>
            <ul className="space-y-1.5">
              {illnesses.map((illness:string, i:string) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#0c0a09]">
                  <span className="text-orange-500 font-bold mt-0.5">•</span>
                  <span>{illness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diet */}
        {info?.dietaryNeeds && (
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Dietary Needs</p>
            <p className="text-sm text-neutral-700 leading-relaxed">{info.dietaryNeeds}</p>
          </div>
        )}

        {/* Confidence breakdown */}
        {allPredictions.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Confidence Breakdown
            </p>
            <div className="space-y-2">
              {allPredictions.slice(0, 5).map((p:{ breed: string; confidence: number }, i:number) => (
                <div key={p.breed}>
                  <div className="flex justify-between text-xs text-neutral-500 mb-1">
                    <span>{p.breed}</span>
                    <span>{p.confidence.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${i === 0 ? 'bg-orange-500' : 'bg-orange-200'}`}
                      style={{ width: `${Math.min(p.confidence, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-neutral-400 pt-2 border-t border-neutral-100">
          Identified on {new Date(timestamp).toLocaleString()}
        </p>

      </div>
    </div>
  )
}