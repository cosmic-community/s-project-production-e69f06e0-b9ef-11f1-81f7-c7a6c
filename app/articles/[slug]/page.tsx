// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getMetafieldValue } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  try {
    const article = await getArticleBySlug(slug)
    if (!article) return { title: 'المقال غير موجود | مجلة إبداعية' }
    const excerpt = getMetafieldValue(article.metadata?.excerpt)
    return {
      title: `${article.title} | مجلة إبداعية`,
      description: excerpt || undefined,
    }
  } catch {
    return { title: 'مجلة إبداعية' }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const content = getMetafieldValue(article.metadata?.content) || article.content || ''
  const readingTime = getMetafieldValue(article.metadata?.reading_time)
  const author = article.metadata?.author
  const category = article.metadata?.category
  const image = article.metadata?.featured_image

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <meta name="cosmic-context" content={JSON.stringify({ object_id: article.id, object_type: 'articles' })} />

      {category && (
        <div className="mb-4">
          <CategoryBadge category={category} />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-black text-neutral-900 leading-tight mb-6">
        {article.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-200">
        {author && (
          <Link href={`/authors/${author.slug}`} className="flex items-center gap-2 hover:text-primary-600 transition-colors">
            {author.metadata?.photo?.imgix_url ? (
              <img
                src={`${author.metadata.photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.title}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <span className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold">
                {author.title.charAt(0)}
              </span>
            )}
            <span className="font-medium text-neutral-800">{author.title}</span>
          </Link>
        )}
        {readingTime && <span>{readingTime} دقيقة قراءة</span>}
      </div>

      {image?.imgix_url && (
        <img
          src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={article.title}
          width={800}
          height={450}
          className="w-full rounded-2xl mb-10 object-cover"
        />
      )}

      {content ? (
        <div
          className="prose prose-neutral max-w-none prose-lg leading-8 prose-headings:font-bold prose-a:text-primary-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="text-neutral-500">لا يوجد محتوى لهذا المقال.</p>
      )}
    </article>
  )
}