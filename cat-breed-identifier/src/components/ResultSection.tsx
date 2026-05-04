'use client'

import { useState } from 'react'
import { BreedIdentification } from '@/src/lib/types'
import { Clock, Trash2 } from 'lucide-react'

interface Props {
  currentResult: BreedIdentification | null
  history: BreedIdentification[]
  isLoading: boolean
  onSelectFromHistory: (b: BreedIdentification) => void
  onClearHistory: () => void
}

const TABS = ['Overview', 'Temperament', 'Diet', 'Health', 'History'] as const
type Tab = typeof TABS[number]

export function ResultsSection({
  currentResult,
  history,
  isLoading,
  onSelectFromHistory,
  onClearHistory,
}: Props) {
  const [tab, setTab] = useState<Tab>('Overview')

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
        <div className="text-5xl mb-4 animate-bounce">🐱</div>
        <p className="text-sm">Identifying your cat's breed...</p>
      </div>
    )
  }

  if (!currentResult) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
        <div className="text-5xl mb-4">🐾</div>
        <p className="font-medium text-neutral-600 mb-1">No result yet</p>
        <p className="text-sm">Upload a cat photo to get started</p>
      </div>
    )
  }

  const { breed, confidence, secondaryBreed, isMixed, info, allPredictions } = currentResult

  const confColor =
    confidence >= 75
      ? 'bg-green-100 text-green-700'
      : confidence >= 50
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700'

  return (
    <div>
      {/* Result header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">{breed}</h2>
          {info && (
            <p className="text-xs text-neutral-400 mt-0.5">
              🌍 {info.origin} · {info.averageLifespan}
            </p>
          )}
        </div>
        <span className={`text-sm font-medium px-3 py-1.5 rounded-full flex-shrink-0 ml-3 ${confColor}`}>
          {confidence.toFixed(1)}% match
        </span>
      </div>

      {/* Mixed breed banner */}
      {isMixed && secondaryBreed && (
        <div className="mt-2 mb-3 flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-xs text-amber-700">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
          Possible mixed breed — dominant <strong className="mx-1">{breed}</strong> with secondary traits of{' '}
          <strong className="ml-1">{secondaryBreed}</strong>
        </div>
      )}

      {/* Fun fact pill */}
      {info?.funFact && (
        <div className="my-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5 text-xs text-orange-700 leading-relaxed">
          <span className="font-semibold">✨ Fun fact: </span>{info.funFact}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-0 mb-4 border-b border-neutral-200 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-xs whitespace-nowrap border-b-2 transition-colors -mb-px ${
              tab === t
                ? 'border-orange-500 text-orange-600 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {tab === 'Overview' && info && (
        <div className="space-y-4">
          <p className="text-sm text-neutral-600 leading-relaxed">{info.description}</p>

          <div className="grid grid-cols-2 gap-2">
            <InfoTile label="Lifespan" value={info.averageLifespan} />
            <InfoTile label="Weight" value={info.averageWeight} />
            <InfoTile label="Coat & Build" value={info.physicalCharacteristics} />
            <InfoTile label="Origin" value={info.origin} />
          </div>
        </div>
      )}

      {/* ── Temperament ── */}
      {tab === 'Temperament' && info && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {info.temperament.split(',').map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full"
              >
                {t.trim()}
              </span>
            ))}
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">{info.temperamentDetail}</p>
          <div className="bg-neutral-50 rounded-xl p-4">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Recommended Care</p>
            <p className="text-sm text-neutral-700 leading-relaxed">{info.recommendedCare}</p>
          </div>
        </div>
      )}

      {/* ── Diet ── */}
      {tab === 'Diet' && info && (
        <div className="bg-orange-50 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-orange-400 mb-2">Dietary Needs</p>
          <p className="text-sm text-neutral-700 leading-relaxed">{info.dietaryNeeds}</p>
        </div>
      )}

      {/* ── Health ── */}
      {tab === 'Health' && info && (
        <div className="space-y-3">
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-red-400 mb-2">Common Health Issues</p>
            <p className="text-sm text-neutral-700 leading-relaxed">{info.healthIssues}</p>
          </div>

          {/* Confidence breakdown */}
          {allPredictions.length > 0 && (
            <div className="bg-neutral-50 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Confidence Breakdown</p>
              <div className="space-y-2.5">
                {allPredictions.slice(0, 5).map((p, i) => (
                  <div key={p.breed}>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>{p.breed}</span>
                      <span>{p.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
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
        </div>
      )}

      {/* ── History ── */}
      {tab === 'History' && (
        <div>
          {history.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-8">No history yet</p>
          ) : (
            <>
              <div className="space-y-2 mb-3">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectFromHistory(h)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 border border-neutral-100 transition-colors text-left"
                  >
                    <img
                      src={h.imageUrl}
                      alt={h.breed}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-800 text-sm">{h.breed}</p>
                      <p className="text-xs text-neutral-400">
                        {h.confidence.toFixed(1)}% · {new Date(h.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <Clock size={14} className="text-neutral-300 flex-shrink-0" />
                  </button>
                ))}
              </div>
              <button
                onClick={onClearHistory}
                className="w-full flex items-center justify-center gap-2 text-xs text-red-400 hover:text-red-600 py-2 transition-colors"
              >
                <Trash2 size={12} /> Clear history
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-orange-50 rounded-xl px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-orange-400 mb-0.5">{label}</p>
      <p className="text-sm text-neutral-700 leading-snug">{value}</p>
    </div>
  )
}