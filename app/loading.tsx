export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-neutral-200 rounded w-1/3 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 bg-neutral-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}