import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata = {
  title: 'الكتّاب | مجلة إبداعية',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-neutral-900 mb-8">الكتّاب</h1>

      {authors.length === 0 ? (
        <p className="text-center text-neutral-500 py-16">لا يوجد كتّاب بعد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  )
}