import Link from 'next/link'
import { getArticles, getCategories } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'
import CategoryBadge from '@/components/CategoryBadge'

export default async function HomePage() {
  const [articles, categories] = await Promise.all([getArticles(9), getCategories()])

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">
            مجلة إبداعية للأفكار والإلهام
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-8">
            اكتشف أحدث المقالات في التصميم، الثقافة، والتقنية من نخبة من الكتّاب المتميزين.
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">أحدث المقالات</h2>
          <Link href="/articles" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
            عرض الكل ←
          </Link>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-neutral-500 py-16">لا توجد مقالات بعد.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}