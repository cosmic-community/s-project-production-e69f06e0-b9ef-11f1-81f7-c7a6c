import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryBadgeProps {
  category: Category
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold hover:bg-primary-100 transition-colors"
    >
      {name}
    </Link>
  )
}