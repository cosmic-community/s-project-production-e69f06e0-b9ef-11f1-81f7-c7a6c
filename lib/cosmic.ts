import { getCosmic } from '@/lib/cosmic-preview'
import type { Article, Category, Author } from '@/types'

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function getDateValue(item: {
  published_at?: string | null
  modified_at?: string | null
  created_at?: string | null
}): number {
  const raw = item.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}

const ARTICLE_PROPS = ['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at']
const CATEGORY_PROPS = ['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at']
const AUTHOR_PROPS = ['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at']

export async function getArticles(limit?: number): Promise<Article[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects.find({ type: 'articles' }).props(ARTICLE_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    let articles = response.objects as Article[]
    articles = articles.sort((a, b) => getDateValue(b) - getDateValue(a))
    return typeof limit === 'number' ? articles.slice(0, limit) : articles
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch articles')
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects.findOne({ type: 'articles', slug }).props(ARTICLE_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as Article) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch article')
  }
}

export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'articles', 'metadata.category': categoryId })
      .props(ARTICLE_PROPS)
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const articles = response.objects as Article[]
    return articles.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch articles by category')
  }
}

export async function getArticlesByAuthor(authorId: string): Promise<Article[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'articles', 'metadata.author': authorId })
      .props(ARTICLE_PROPS)
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const articles = response.objects as Article[]
    return articles.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch articles by author')
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects.find({ type: 'categories' }).props(CATEGORY_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects.findOne({ type: 'categories', slug }).props(CATEGORY_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as Category) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch category')
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects.find({ type: 'authors' }).props(AUTHOR_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch authors')
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects.findOne({ type: 'authors', slug }).props(AUTHOR_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as Author) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch author')
  }
}