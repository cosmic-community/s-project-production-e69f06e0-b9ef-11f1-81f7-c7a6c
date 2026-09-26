import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'مجلة إبداعية | Creative Magazine',
  description: 'مجلة رقمية عربية تعرض أحدث المقالات والأخبار الإبداعية من نخبة من الكتّاب.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📰</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6ab836c8b068eea79690f23e"></script>
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-arabic antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}