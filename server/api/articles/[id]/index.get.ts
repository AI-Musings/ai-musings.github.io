import { client } from '~~/server/contentful'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  const entry = await client.getEntry<ContentfulArticle>(id.toString())

  if (!entry.fields.updateAudio) {
    return entry
  }

  // update audio
  await $fetch(`/api/articles/${id}/audio`, {
    method: 'PUT',
  })

  // refresh entry
  const updatedEntry = await client.getEntry<ContentfulArticle>(id.toString())

  return updatedEntry
})
