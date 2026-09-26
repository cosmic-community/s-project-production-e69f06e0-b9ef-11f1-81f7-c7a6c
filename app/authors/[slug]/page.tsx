// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getArticlesByAuthor, getMetafieldValue } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params
  try {
    const author = await getAuthorBySlug(slug)
    if (!author) return { title: 'الكاتب غير موجود | مجلة إبداعية' }
    return { title: `${author.title} | مجلة إبداعية` }
  } catch {
    return { title: 'مجلة إبداعية' }
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const articles = await getArticlesByAuthor(author.id)
  const bio = getMetafieldValue(author.metadata?.bio)
  const photo = author.metadata?.photo

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <meta name="cosmic-context" content={JSON.stringify({ object_id: author.id, object_type: 'authors' })} />

      <div className="flex flex-col items-center text-center mb-12">
        {photo?.imgix_url ? (
          <img
            src={`${photo.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
            alt={author.title}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover mb-6 ring-4 ring-primary-50"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-4xl font-bold mb-6">
            {author.title.charAt(0)}
          </div>
        )}
        <h1 className="text-3xl font-black text-neutral-900 mb-3">{author.title}</h1>
        {bio && <p className="text-neutral-600 max-w-2xl leading-8">{bio}</p>}
      </div>

      <h2 className="text-2xl font-bold text-neutral-900 mb-6">مقالات الكاتب</h2>

      {articles.length === 0 ? (
        <p className="text-center text-neutral-500 py-16">لا توجد مقالات لهذا الكاتب بعد.</p>
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