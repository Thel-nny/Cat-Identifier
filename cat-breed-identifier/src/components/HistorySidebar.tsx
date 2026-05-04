'use client'

import { BreedIdentification } from '@/src/lib/types'
import { X } from 'lucide-react'

interface HistorySidebarProps {
  history: BreedIdentification[]
  onSelectBreed: (breed: BreedIdentification) => void
  onClearHistory: () => void
  selectedId?: string
}

export function HistorySidebar({
  history,
  onSelectBreed,
  onClearHistory,
  selectedId,
}: HistorySidebarProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
        <div className="text-4xl">🐱</div>
        <div>
          <h3 className="font-bold text-neutral-900 mb-1">No history yet</h3>
          <p className="text-sm text-neutral-500">Upload a cat photo to start identifying breeds</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg overflow-hidden flex flex-col max-h-[600px]">

      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex-shrink-0">
        <h3 className="font-bold text-neutral-900">History</h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          {history.length} {history.length === 1 ? 'scan' : 'scans'}
        </p>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {history.map((item) => {
          const isSelected = selectedId === item.timestamp
          const confColor =
            item.confidence >= 75 ? 'text-green-600' :
            item.confidence >= 50 ? 'text-amber-600' : 'text-red-500'

          return (
            <button
              key={item.timestamp}
              onClick={() => onSelectBreed(item)}
              className={`w-full p-3 rounded-xl transition-all text-left border-2 ${
                isSelected
                  ? 'bg-orange-50 border-orange-400'
                  : 'bg-neutral-50 border-transparent hover:bg-neutral-100'
              }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-200">
                  <img
                    src={item.imageUrl}
                    alt={item.breed}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-900 truncate text-sm">{item.breed}</p>
                  <p className={`text-xs font-medium ${confColor}`}>
                    {item.confidence.toFixed(1)}% match
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Clear button */}
      <div className="border-t border-neutral-200 p-3 flex-shrink-0">
        <button
          onClick={onClearHistory}
          className="w-full px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition flex items-center justify-center gap-2"
        >
          <X size={15} />
          Clear History
        </button>
      </div>
    </div>
  )
}