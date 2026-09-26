# مجلة إبداعية (Creative Magazine)
![App Preview](https://imgix.cosmicjs.com/00e91180-b9f0-11f1-8db3-4fb4c6c7a846-autopilot-photo-1512453979798-5ea266f8880c-1790457588367.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern Arabic-friendly (RTL) blog/magazine built with Next.js 16 and powered by Cosmic. Browse articles, categories, and authors with a clean, fast, responsive design.

## Features

- 🏠 Homepage with featured categories and latest articles
- 📰 Article archive and detail pages with reading time, author and category
- 🏷️ Category listing and per-category article pages
- ✍️ Author listing and author profile pages with bio, photo, and articles
- 🌐 Full RTL layout with Arabic web font (Tajawal)
- ⚡ Server Components for fast, SEO-friendly rendering
- 📱 Fully responsive, mobile-first design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ab836c8b068eea79690f240&clone_repository=6ab83883b068eea79690f2e3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create content models for: م

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "s-project-production-e69f06e0-b9ef-11f1-81f7-c7a6cc5914ae-app-8cyl". The content is managed in Cosmic CMS with the following object types: articles, categories, authors. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A modern blog / magazine website (Arabic-friendly, RTL support) displaying Articles with featured images, excerpts, reading time, author and category. Pages: home with latest articles, article detail page, category pages listing articles per category, author pages with bio and photo and their articles. Clean, responsive, fast design.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — App Router, Server Components
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (with `@tailwindcss/typography`)
- [Cosmic](https://www.cosmicjs.com/docs) — headless CMS for content

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account and bucket with `articles`, `categories`, and `authors` object types

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

### Run locally

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch latest articles with connected author & category
const { cosmic, previewToken } = await getCosmic()
const response = await cosmic.objects
  .find({ type: 'articles' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

```typescript
// Fetch articles belonging to a specific category
const response = await cosmic.objects
  .find({ type: 'articles', 'metadata.category': categoryId })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three object types in your Cosmic bucket:

- **articles** — `content`, `excerpt`, `featured_image`, `author` (object), `category` (object), `reading_time`
- **categories** — `name`, `description`
- **authors** — `name`, `bio`, `photo`

All object relationships (author, category) are resolved using Cosmic's `depth` parameter so full connected data is available without extra queries.

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com/)
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://www.netlify.com/)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the environment variables in the Netlify dashboard
5. Deploy

<!-- README_END -->