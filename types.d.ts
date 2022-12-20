interface ContentfulArticle extends import('contentful').Entry {
  title: string
  description?: string
  categories: string[]
  body: string
  updateAudio: boolean
  audio?: import('contentful').Asset
}
