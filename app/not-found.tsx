import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">🧭</div>
      <h1 className="text-3xl font-black text-neutral-900 mb-4">الصفحة غير موجودة</h1>
      <p className="text-neutral-600 mb-8">عذرًا، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.</p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
      >
        العودة للرئيسية
      </Link>
    </div>
  )
}