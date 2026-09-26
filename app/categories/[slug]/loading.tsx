// app/categories/[slug]/loading.tsx
export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="text-center mb-10">
        <div className="h-6 w-16 bg-neutral-200 rounded-full mx-auto mb-4" />
        <div className="h-9 bg-neutral-200 rounded w-1/3 mx-auto mb-4" />
        <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 bg-neutral-200 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}