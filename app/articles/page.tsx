import { getArticles } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'

export const metadata = {
  title: 'المقالات | مجلة إبداعية',
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-neutral-900 mb-8">جميع المقالات</h1>

      {articles.length === 0 ? (
        <p className="text-center text-neutral-500 py-16">لا توجد مقالات بعد.</p>
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