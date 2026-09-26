// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getArticlesByCategory, getMetafieldValue } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  try {
    const category = await getCategoryBySlug(slug)
    if (!category) return { title: 'القسم غير موجود | مجلة إبداعية' }
    const name = getMetafieldValue(category.metadata?.name) || category.title
    return { title: `${name} | مجلة إبداعية` }
  } catch {
    return { title: 'مجلة إبداعية' }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const articles = await getArticlesByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <meta name="cosmic-context" content={JSON.stringify({ object_id: category.id, object_type: 'categories' })} />

      <div className="mb-10 text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4">
          قسم
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">{name}</h1>
        {description && <p className="text-neutral-600 max-w-2xl mx-auto leading-8">{description}</p>}
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-neutral-500 py-16">لا توجد مقالات في هذا القسم بعد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}