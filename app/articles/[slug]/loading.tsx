// app/articles/[slug]/loading.tsx
export default function ArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-6 w-24 bg-neutral-200 rounded-full mb-4" />
      <div className="h-10 bg-neutral-200 rounded w-3/4 mb-6" />
      <div className="h-4 bg-neutral-200 rounded w-1/2 mb-8" />
      <div className="h-72 bg-neutral-200 rounded-2xl mb-10" />
      <div className="space-y-4">
        <div className="h-4 bg-neutral-200 rounded w-full" />
        <div className="h-4 bg-neutral-200 rounded w-full" />
        <div className="h-4 bg-neutral-200 rounded w-2/3" />
      </div>
    </div>
  )
}