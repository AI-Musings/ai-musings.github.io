import { client } from '~~/server/contentful'

export default defineEventHandler(async (event) => {
  const entries = await client.getEntries<ContentfulArticle>({
    content_type: 'article',
    order: '-sys.createdAt',
  })

  return entries
})
