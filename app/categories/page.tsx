import Link from 'next/link'
import { getCategories, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'الأقسام | مجلة إبداعية',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-neutral-900 mb-8">الأقسام</h1>

      {categories.length === 0 ? (
        <p className="text-center text-neutral-500 py-16">لا توجد أقسام بعد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const name = getMetafieldValue(category.metadata?.name) || category.title
            const description = getMetafieldValue(category.metadata?.description)
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-2">
                  {name}
                </h2>
                {description && (
                  <p className="text-sm text-neutral-600 leading-7 line-clamp-3">{description}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}