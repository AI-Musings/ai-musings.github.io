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

  return article
})
