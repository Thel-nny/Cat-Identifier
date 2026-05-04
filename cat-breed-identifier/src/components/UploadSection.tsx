'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload, Camera } from 'lucide-react'

interface Props {
  onImageSelected: (imageData: string) => void
  isLoading: boolean
}

export function UploadSection({ onImageSelected, isLoading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result as string
      setPreview(data)
      onImageSelected(data)
    }
    reader.readAsDataURL(file)
  }, [onImageSelected])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) handleFile(file)
  }, [handleFile])

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-800 mb-4">Upload a Photo</h2>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-4
          ${dragging ? 'border-orange-400 bg-orange-50' : 'border-neutral-300 hover:border-orange-300 hover:bg-orange-50/40'}`}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
        ) : (
          <>
            <Upload className="mx-auto mb-3 text-neutral-400" size={32} />
            <p className="text-sm text-neutral-600"><span className="font-medium">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-neutral-400 mt-1">JPG, PNG supported</p>
          </>
        )}
      </div>

      {/* Camera button */}
      <button
        onClick={() => cameraRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-300 text-neutral-600 hover:border-orange-300 hover:text-orange-600 transition-colors text-sm font-medium mb-4"
      >
        <Camera size={18} />
        Take a Photo
      </button>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

      {isLoading && (
        <div className="text-center py-4">
          <div className="flex justify-center gap-1.5 mb-2">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-orange-400"
                style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </div>
          <p className="text-sm text-neutral-500">Analysing breed...</p>
          <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }`}</style>
        </div>
      )}
    </div>
  )
}