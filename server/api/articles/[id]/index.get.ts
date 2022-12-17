import { client } from '~~/server/contentful'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  const entry = await client.getEntry<ContentfulArticle>(id.toString())

  return entry
})
