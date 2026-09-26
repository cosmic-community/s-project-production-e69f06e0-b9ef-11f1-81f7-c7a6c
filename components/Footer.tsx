import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-3">مجلة إبداعية</h3>
            <p className="text-sm leading-7 text-neutral-400">
              مجلة رقمية تعرض أحدث المقالات الإبداعية في مختلف المجالات، مقدمة بأسلوب عصري وسهل القراءة.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  المقالات
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  الأقسام
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-white transition-colors">
                  الكتّاب
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">حول المجلة</h4>
            <p className="text-sm text-neutral-400 leading-7">
              منصة مبنية باستخدام Cosmic لإدارة المحتوى بسهولة ومرونة.
            </p>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-sm text-neutral-500">
          © {year} مجلة إبداعية. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}