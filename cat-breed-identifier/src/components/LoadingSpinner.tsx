export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-neutral-600 font-medium">Identifying breed...</p>
    </div>
  )
}
