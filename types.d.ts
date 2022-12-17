interface ContentfulArticle extends import('contentful').Entry {
  title: string
  description?: string
  categories: string[]
  audio?: import('contentful').Asset
  body: string
}
