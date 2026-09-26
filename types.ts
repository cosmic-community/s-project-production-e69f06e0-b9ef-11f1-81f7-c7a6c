export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  published_at?: string
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
  }
}

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    bio?: string
    photo?: CosmicFile
  }
}

export interface Article extends CosmicObject {
  type: 'articles'
  metadata: {
    content?: string
    excerpt?: string
    featured_image?: CosmicFile
    author?: Author
    category?: Category
    reading_time?: number | string
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}