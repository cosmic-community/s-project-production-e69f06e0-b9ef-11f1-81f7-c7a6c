import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const bio = getMetafieldValue(author.metadata?.bio)
  const photo = author.metadata?.photo

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col items-center text-center bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-xl transition-shadow duration-300"
    >
      {photo?.imgix_url ? (
        <img
          src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
          alt={author.title}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-primary-50"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-3xl font-bold mb-4">
          {author.title.charAt(0)}
        </div>
      )}
      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
        {author.title}
      </h3>
      {bio && <p className="text-sm text-neutral-600 mt-2 leading-7 line-clamp-3">{bio}</p>}
    </Link>
  )
}