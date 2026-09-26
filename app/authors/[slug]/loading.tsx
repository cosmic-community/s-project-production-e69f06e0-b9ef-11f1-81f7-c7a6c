// app/authors/[slug]/loading.tsx
export default function AuthorLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-32 h-32 rounded-full bg-neutral-200 mb-6" />
        <div className="h-8 bg-neutral-200 rounded w-1/3 mb-3" />
        <div className="h-4 bg-neutral-200 rounded w-1/2" />
      </div>
      <div className="h-7 bg-neutral-200 rounded w-1/4 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-80 bg-neutral-200 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}