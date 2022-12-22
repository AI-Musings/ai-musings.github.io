import { graphql } from '~~/server/contentful'
import { gql } from 'graphql-tag'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  const query = gql`
    query Article($id: String!) {
      article(id: $id) {
        sys {
          id
          firstPublishedAt
        }
        title
        description
        body
        categories
        image {
          url
        }
        updateAudio
        audio {
          url
        }
      }
    }
  `

  const { article } = await graphql({
    query,
    variables: {
      id,
    },
  })

  if (!article?.updateAudio) {
    return article
  }

  // update audio
  await $fetch(`/api/articles/${id}/audio`, {
    method: 'PUT',
  })

  // refresh entry
  const { article: updatedArticle } = await graphql({
    query,
    variables: {
      id,
    },
  })

  return updatedArticle
})
