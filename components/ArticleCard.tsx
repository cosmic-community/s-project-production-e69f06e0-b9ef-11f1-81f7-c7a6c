import Link from 'next/link'
import type { Article } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const excerpt = getMetafieldValue(article.metadata?.excerpt)
  const readingTime = getMetafieldValue(article.metadata?.reading_time)
  const author = article.metadata?.author
  const category = article.metadata?.category
  const image = article.metadata?.featured_image

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link href={`/articles/${article.slug}`} className="block overflow-hidden aspect-[16/10] bg-neutral-100">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={article.title}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">📝</div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        {category && (
          <div className="mb-3">
            <CategoryBadge category={category} />
          </div>
        )}

        <h3 className="text-lg font-bold text-neutral-900 leading-8 mb-2 line-clamp-2">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary-600 transition-colors">
            {article.title}
          </Link>
        </h3>

        {excerpt && <p className="text-sm text-neutral-600 leading-7 line-clamp-3 mb-4 flex-1">{excerpt}</p>}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100 text-sm text-neutral-500">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:text-primary-600 transition-colors"
            >
              {author.metadata?.photo?.imgix_url ? (
                <img
                  src={`${author.metadata.photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.title}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <span className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                  {author.title.charAt(0)}
                </span>
              )}
              <span>{author.title}</span>
            </Link>
          )}
          {readingTime && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {readingTime} دقيقة
            </span>
          )}
        </div>
      </div>
    </article>
  )
}